const express = require("express");
const eventController = require("../controllers/eventController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => eventController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, verifyToken, async (req, res) =>
  eventController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => eventController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    eventController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    eventController.updateOne(req, res)
  );

router.get(
  "/:id/place",
  cache.get,
  async (req, res) => eventController.getEventPlace(req, res),
  cache.set
);

module.exports = router;
