const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        game: true,
        place: true,
      },
    });
    res.status(200).send({ data: bookings });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const addOne = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({ error: "User Id is missing!" });
  }

  if (!req.body.placeId) {
    res.status(400).send({ error: "Place Id is missing!" });
  }

  if (!req.body.date) {
    res.status(400).send({ error: "Date Id is missing!" });
  }

  if (!req.body.nbPeople) {
    res.status(400).send({ error: "Number of People is missing!" });
  }

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId: req.body.userId,
        date: new Date(req.body.date),
        placeId: req.body.placeId,
        nbPeople: parseInt(req.body.nbPeople),
        ...(req.body.gameId && { gameId: req.body.gameId }),
      },
    });
    res.status(200).send({ success: "Booking created!" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        place: true,
        user: true,
        game: true,
      },
    });
    if (booking) {
      res.status(200).send({ booking });
    } else {
      res.status(400).send({ error: "Booking not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getBookingPlace = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        place: true,
      },
    });
    if (booking) {
      res.status(200).send(booking.place);
    } else {
      res.status(400).send({ error: "Booking not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getBookingUser = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        user: true,
      },
    });
    if (booking) {
      res.status(200).send(booking.user);
    } else {
      res.status(400).send({ error: "Booking not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getBookingGame = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        game: true,
      },
    });
    if (booking) {
      res.status(200).send(booking.game);
    } else {
      res.status(400).send({ error: "Booking not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.booking.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (find) {
      const deleteBooking = await prisma.booking.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).send({ success: `Booking ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "Booking not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.booking.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (find) {
      const updateBooking = await prisma.booking.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          date: req.body.date && new Date(req.body.date),
          userId: req.body.userId,
          placeId: req.body.placeId,
          nbPeople: req.body.nbPeople && parseInt(req.body.nbPeople),
          ...(req.body.gameId && { gameId: req.body.gameId }),
        },
      });
      res.status(200).send({
        success: `Booking ${req.params.id} updated!`,
        booking: updateBooking,
      });
    } else {
      res.status(400).send({ error: "Booking not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
  getBookingPlace,
  getBookingUser,
  getBookingGame,
};
