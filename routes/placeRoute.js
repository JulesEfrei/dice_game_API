const express = require("express");
const placeController = require("../controllers/placeController");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", async (req, res) => placeController.getAll(res));

router.post("/", verifyToken, async (req, res) =>
  placeController.addOne(req, res)
);

router
  .route("/:id")
  .get(async (req, res) => placeController.getOne(req, res))
  .delete(verifyToken, async (req, res) => placeController.deleteOne(req, res))
  .patch(verifyToken, async (req, res) => placeController.updateOne(req, res));

module.exports = router;
