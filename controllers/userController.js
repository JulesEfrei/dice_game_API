const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({ data: users });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (user) {
      res.status(200).send({ user });
    } else {
      res.status(400).send({ error: "Use not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).send({ success: `User ${req.params.id} deleted!` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

module.exports = { getAll, getOne, deleteOne };
