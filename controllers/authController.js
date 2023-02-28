const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

require("dotenv").config();

async function newUser(req, res) {
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

      const welcomeBadge = await prisma.userToBadge.create({
        data: {
          userId: parseInt(newUser.id),
          badgeId: parseInt(1),
        },
      });

      res.status(200).send({ success: "User Created!" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
}

async function signIn(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.status(404).send({ error: "User not found" });
    return false;
  }

  const verifPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!verifPassword) {
    res.status(401).send({ error: "Password invalid!" });
    return false;
  }

  //Generate token
  var token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    id: user.id,
    userName: user.userName,
    email: user.email,
    accessToken: token,
  });
}

module.exports = { newUser, signIn };
