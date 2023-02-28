const express = require("express");
const placeController = require("../controllers/placeController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => placeController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, verifyToken, async (req, res) =>
  placeController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => placeController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    placeController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    placeController.updateOne(req, res)
  );

module.exports = router;
