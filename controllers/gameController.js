const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        review: {
          include: {
            user: true,
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });
    res.status(200).send({ data: games });
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

  if (!req.body.category) {
    res.status(400).send({ error: "category is missing!" });
  }

  if (!req.body.age) {
    res.status(400).send({ error: "age is missing!" });
  }

  if (!req.body.releaseYear) {
    res.status(400).send({ error: "releaseYear is missing!" });
  }

  try {
    const newGame = await prisma.game.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        age: req.body.age,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        playTime: req.body.playTime,
        releaseYear: new Date(req.body.releaseYear),
        ...(req.body.quantity && { quantity: req.body.quantity }),
        ...(req.body.price && { quantity: req.body.price }),
        ...(req.body.rating && { quantity: req.body.rating }),
      },
    });
    res.status(200).send({ success: "Game created!" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        review: {
          include: {
            user: true,
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });
    if (game) {
      res.status(200).send({ game });
    } else {
      res.status(400).send({ error: "Game not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.game.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const deleteGame = await prisma.game.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ success: `Game ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "Game not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.game.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const updateGame = await prisma.game.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          type: req.body.type,
          age: req.body.age,
          releaseYear: req.body.releaseYear && new Date(req.body.releaseYear),
          ...(req.body.quantity && { quantity: req.body.quantity }),
          ...(req.body.price && { quantity: req.body.price }),
        },
      });
      res.status(200).send({
        success: `Game ${req.params.id} updated!`,
        game: updateGame,
      });
    } else {
      res.status(400).send({ error: "Game not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = { getAll, addOne, getOne, deleteOne, updateOne };
