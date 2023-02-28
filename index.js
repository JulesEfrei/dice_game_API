const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const placeRoutes = require("./routes/placeRoute");
const gameRoutes = require("./routes/gameRoute");
const eventRoutes = require("./routes/eventRoute");
const badgeRoutes = require("./routes/badgeRoute");
const bookingRoutes = require("./routes/bookingRoute");
const reviewRoutes = require("./routes/reviewRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/place", placeRoutes);
app.use("/api/v1/game", gameRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/badge", badgeRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/review", reviewRoutes);

app.listen(port, () => {
  console.log(`⚡️ [Server]: Server starting on port ${port}`);
});
