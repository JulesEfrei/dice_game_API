const express = require("express");
const badgeController = require("../controllers/badgeController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => badgeController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, verifyToken, async (req, res) =>
  badgeController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => badgeController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    badgeController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    badgeController.updateOne(req, res)
  );

module.exports = router;
