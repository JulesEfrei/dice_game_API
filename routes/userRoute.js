const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", async (req, res) => userController.getAll(res));

router
  .route("/:id")
  .get(async (req, res) => userController.getOne(req, res))
  .delete(async (req, res) => userController.deleteOne(req, res))
  .patch(async (req, res) => userController.updateOne(req, res));

module.exports = router;

//GET / => all user
//GET /:id => One user
//DELETE /:id => Delete one user
//PATCH /:id => Update on user
//
