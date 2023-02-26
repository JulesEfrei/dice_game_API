const express = require("express");
const gameController = require("../controllers/gameController");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", async (req, res) => gameController.getAll(res));

router.post("/", verifyToken, async (req, res) =>
  gameController.addOne(req, res)
);

router
  .route("/:id")
  .get(async (req, res) => gameController.getOne(req, res))
  .delete(verifyToken, async (req, res) => gameController.deleteOne(req, res))
  .patch(verifyToken, async (req, res) => gameController.updateOne(req, res));

module.exports = router;
