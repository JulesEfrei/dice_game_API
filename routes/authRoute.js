const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/sign-in", (req, res) => authController.signIn(req, res));

router.post("/register", (req, res) => authController.newUser(req, res));

module.exports = router;
