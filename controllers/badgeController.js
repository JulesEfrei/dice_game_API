const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const badges = await prisma.badge.findMany();
    res.status(200).send({ data: badges });
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

  if (!req.body.condition) {
    res.status(400).send({ error: "Condition is missing!" });
  }

  if (!req.body.img) {
    res.status(400).send({ error: "Image is missing!" });
  }

  try {
    const newBadge = await prisma.badge.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        condition: req.body.condition,
        img: req.body.img,
      },
    });
    res.status(200).send({ success: "Badge created!" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const badge = await prisma.badge.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (badge) {
      res.status(200).send({ badge });
    } else {
      res.status(400).send({ error: "Badge not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.badge.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const deleteBadge = await prisma.badge.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ success: `Badge ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "Badge not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.badge.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const updatebadge = await prisma.badge.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });
      res.status(200).send({
        success: `badge ${req.params.id} updated!`,
        badge: updatebadge,
      });
    } else {
      res.status(400).send({ error: "badge not found!" });
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
};
