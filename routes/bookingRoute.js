const express = require("express");
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => bookingController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, verifyToken, async (req, res) =>
  bookingController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => bookingController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    bookingController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    bookingController.updateOne(req, res)
  );

router.get(
  "/:id/user",
  cache.get,
  async (req, res) => bookingController.getBookingUser(req, res),
  cache.set
);

router.get(
  "/:id/game",
  cache.get,
  async (req, res) => bookingController.getBookingGame(req, res),
  cache.set
);

router.get(
  "/:id/place",
  cache.get,
  async (req, res) => bookingController.getBookingPlace(req, res),
  cache.set
);

module.exports = router;
