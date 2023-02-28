const express = require("express");
const reviewController = require("../controllers/reviewController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => reviewController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, verifyToken, async (req, res) =>
  reviewController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => reviewController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    reviewController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    reviewController.updateOne(req, res)
  );

router.get(
  "/:id/user",
  cache.get,
  async (req, res) => reviewController.getReviewUser(req, res),
  cache.set
);

router.get(
  "/:id/game",
  cache.get,
  async (req, res) => reviewController.getReviewGame(req, res),
  cache.set
);

module.exports = router;
