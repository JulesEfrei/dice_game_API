const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyToken");
const cache = require("../utils/cache");

const router = express.Router();

router.get(
  "/",
  cache.get,
  async (req, res) => userController.getAll(res),
  cache.set
);

router.post("/", verifyToken, cache.clear, async (req, res) =>
  userController.addOne(req, res)
);

router
  .route("/:id")
  .get(
    cache.get,
    async (req, res) => userController.getOne(req, res),
    cache.set
  )
  .delete(verifyToken, cache.clear, async (req, res) =>
    userController.deleteOne(req, res)
  )
  .patch(verifyToken, cache.clear, async (req, res) =>
    userController.updateOne(req, res)
  );

module.exports = router;
