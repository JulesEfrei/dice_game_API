const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => userController.getAll(res));

router
  .route("/:id")
  .get(verifyToken, async (req, res) => userController.getOne(req, res))
  .delete(verifyToken, async (req, res) => userController.deleteOne(req, res));
//   .patch(verifyToken, async (req, res) => userController.updateOne(req, res));

module.exports = router;

//GET / => all user
//GET /:id => One user
//DELETE /:id => Delete one user
//PATCH /:id => Update on user
