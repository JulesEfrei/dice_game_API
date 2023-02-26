const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", async (req, res) => userController.getAll(res));

router.post("/", async (req, res) => userController.addOne(req, res));

router
  .route("/:id")
  .get(async (req, res) => userController.getOne(req, res))
  .delete(verifyToken, async (req, res) => userController.deleteOne(req, res))
  .patch(verifyToken, async (req, res) => userController.updateOne(req, res));

module.exports = router;
