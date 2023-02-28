const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        game: true,
      },
    });
    res.status(200).send({ data: reviews });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const addOne = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({ error: "User Id is missing!" });
  }

  if (!req.body.gameId) {
    res.status(400).send({ error: "Game Id is missing!" });
  }

  if (!req.body.content) {
    res.status(400).send({ error: "Content is missing!" });
  }

  if (!req.body.rating) {
    res.status(400).send({ error: "Rating is missing!" });
  }

  try {
    const newReview = await prisma.review.create({
      data: {
        userId: req.body.userId,
        gameId: req.body.gameId,
        rating: parseInt(req.body.rating),
        content: req.body.content,
      },
    });
    res.status(200).send({ success: "Review created!" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        user: true,
        game: true,
      },
    });
    if (review) {
      res.status(200).send({ review });
    } else {
      res.status(400).send({ error: "Review not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getReviewUser = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        user: true,
      },
    });
    if (review) {
      res.status(200).send(review.user);
    } else {
      res.status(400).send({ error: "Review not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getReviewGame = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        game: true,
      },
    });
    if (review) {
      res.status(200).send(review.game);
    } else {
      res.status(400).send({ error: "Review not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (find) {
      const deleteReview = await prisma.review.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).send({ success: `Review ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "Review not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (find) {
      const updateReview = await prisma.review.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          userId: req.body.userId,
          gameId: req.body.gameId,
          rating: req.body.rating && parseInt(req.body.rating),
          content: req.body.content,
        },
      });
      res.status(200).send({
        success: `Review ${req.params.id} updated!`,
        review: updateReview,
      });
    } else {
      res.status(400).send({ error: "Review not found!" });
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
  getReviewUser,
  getReviewGame,
};
