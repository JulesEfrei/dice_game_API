const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        place: true,
      },
    });
    res.status(200).send({ data: events });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const addOne = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ error: "Name is missing!" });
  }

  if (!req.body.description) {
    res.status(400).send({ error: "Description is missing!" });
  }

  if (!req.body.placeId) {
    res.status(400).send({ error: "Place Id is missing!" });
  }

  try {
    const newPlace = await prisma.event.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        placeId: req.body.placeId,
        ...(req.body.exactDate && { exactDate: new Date(req.body.date) }),
        ...(req.body.day && { day: req.body.day }),
        ...(req.body.time && { time: req.body.time }),
      },
    });
    res.status(200).send({ success: "Event created!" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        place: true,
      },
    });
    if (event) {
      res.status(200).send({ event });
    } else {
      res.status(400).send({ error: "Event not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getEventPlace = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        place: true,
      },
    });
    if (event) {
      res.status(200).send(event.place);
    } else {
      res.status(400).send({ error: "Event not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const deleteEvent = await prisma.event.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ success: `Event ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "Event not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const updateEvent = await prisma.event.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          date: req.body.date && new Date(req.body.date),
          placeId: req.body.placeId,
        },
      });
      res.status(200).send({
        success: `Event ${req.params.id} updated!`,
        event: updateEvent,
      });
    } else {
      res.status(400).send({ error: "Event not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
  getEventPlace,
};
