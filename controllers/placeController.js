const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const places = await prisma.place.findMany();
    res.status(200).send({ data: places });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const addOne = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ error: "Name is missing!" });
  }

  if (!req.body.address) {
    res.status(400).send({ error: "Address is missing!" });
  }

  if (!req.body.city) {
    res.status(400).send({ error: "City is missing!" });
  }

  if (!req.body.zip) {
    res.status(400).send({ error: "Zip code is missing!" });
  }

  if (!req.body.phone) {
    res.status(400).send({ error: "Phone is missing!" });
  }

  if (!req.body.menu) {
    res.status(400).send({ error: "Menu is missing!" });
  }

  try {
    const newPlace = await prisma.place.create({
      data: {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        phone: req.body.phone,
        menu: req.body.menu,
      },
    });
    res.status(200).send({ success: "Place created!" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const place = await prisma.place.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (place) {
      res.status(200).send({ place });
    } else {
      res.status(400).send({ error: "Place not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.place.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const deletePlace = await prisma.place.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ success: `Place ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "Place not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.place.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const updatePlace = await prisma.place.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });
      res.status(200).send({
        success: `Place ${req.params.id} updated!`,
        place: updatePlace,
      });
    } else {
      res.status(400).send({ error: "Place not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = { getAll, addOne, getOne, deleteOne, updateOne };
