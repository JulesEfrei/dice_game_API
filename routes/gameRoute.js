const express = require("express");
const gameController = require("../controllers/gameController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => gameController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, async (req, res) =>
  gameController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => gameController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    gameController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    gameController.updateOne(req, res)
  );

module.exports = router;
