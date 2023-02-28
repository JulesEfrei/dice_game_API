const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const placeRoutes = require("./routes/placeRoute");
const gameRoutes = require("./routes/gameRoute");
const eventRoutes = require("./routes/eventRoute");
const badgeRoutes = require("./routes/badgeRoute");
// const bookingoute = require("./routes/bookingRoute");
// const reviewRoute = require("./routes/reviewRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/place", placeRoutes);
app.use("/game", gameRoutes);
app.use("/event", eventRoutes);
app.use("/badge", badgeRoutes);
// app.use("/booking", bookingRoutes);
// app.use("/review", reviewRoutes);

app.listen(port, () => {
  console.log(`⚡️ [Server]: Server starting on port ${port}`);
});
