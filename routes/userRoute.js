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

//Get all badge earned by the user
router
  .route("/:id/badge")
  .get(
    cache.get,
    async (req, res) => userController.getBadge(req, res),
    cache.set
  )
  .post(verifyToken, cache.clear, async (req, res) =>
    userController.addBadge(req, res)
  );

//Get all badge earned by the user
router
  .route("/:id/game-liked")
  .get(
    cache.get,
    async (req, res) => userController.getLike(req, res),
    cache.set
  )
  .post(verifyToken, cache.clear, async (req, res) =>
    userController.addLike(req, res)
  );

router
  .route("/:id/game-liked/:gameId")
  .get(
    cache.get,
    async (req, res) => userController.getOneLike(req, res),
    cache.set
  )
  .delete(cache.clear, async (req, res) => userController.deleteLike(req, res));

module.exports = router;
