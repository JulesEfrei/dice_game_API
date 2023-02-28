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

const addOne = async (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({ error: "First name missing" });
    return false;
  }

  if (!req.body.lastName) {
    res.status(400).send({ error: "Last name missing" });
    return false;
  }

  if (!req.body.userName) {
    res.status(400).send({ error: "User name missing" });
    return false;
  }

  if (!req.body.email) {
    res.status(400).send({ error: "Email missing" });
    return false;
  }

  if (!req.body.password) {
    res.status(400).send({ error: "Password missing" });
    return false;
  }

  if (!req.body.phone) {
    res.status(400).send({ error: "Phone number missing" });
    return false;
  }

  if (!req.body.gender) {
    res.status(400).send({ error: "Gender missing" });
    return false;
  }

  if (!req.body.birthday) {
    res.status(400).send({ error: "Birthday missing" });
    return false;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(400).send({ error: "Email already registered." });
    } else {
      const newUser = await prisma.user.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          gender: req.body.gender,
          birthday: new Date(req.body.birthday),
          phone: req.body.phone,
        },
      });
      res.status(200).send({ success: "User Created!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getOne = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      res.status(200).send({ user });
    } else {
      res.status(400).send({ error: "User not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const find = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const deleteUser = await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ success: `User ${req.params.id} deleted!` });
    } else {
      res.status(400).send({ error: "User not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const updateOne = async (req, res) => {
  try {
    const find = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (find) {
      const updateUsers = await prisma.user.updateMany({
        where: {
          id: req.params.id,
        },
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password && bcrypt.hashSync(req.body.password, 10),
          gender: req.body.gender,
          birthday: req.body.birthday && new Date(req.body.birthday),
          phone: req.body.phone,
        },
      });
      res
        .status(200)
        .send({ success: `User ${req.params.id} updated!`, user: updateUsers });
    } else {
      res.status(400).send({ error: "User not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getBadge = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (user) {
      const badges = await prisma.userToBadge.findMany({
        where: {
          userId: req.params.id,
        },
        include: {
          badge: true,
        },
      });
      res.status(200).send({ data: badges });
    } else {
      res.status(404).send({ error: "User not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const addBadge = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    const badge = await prisma.badge.findUnique({
      where: {
        id: req.body.badgeId,
      },
    });

    if (user && badge) {
      const addBadgeToUser = await prisma.userToBadge.create({
        data: {
          userId: req.params.id,
          badgeId: req.body.badgeId,
        },
      });
      res.status(200).send({
        success: `Badge ${req.body.badgeId} added to user ${req.body.userId}`,
      });
    } else {
      res.status(404).send({ error: "Entity not found!" });
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
  getBadge,
  addBadge,
};
