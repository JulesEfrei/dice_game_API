const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const authRoute = require("./routes/authRoute");
// const userRoute = require("./routes/userRoute");
// const placeRoute = require("./routes/placeRoute");
// const gameRoute = require("./routes/gameRoute");
// const eventRoute = require("./routes/eventRoute");
// const badgeRoute = require("./routes/badgeRoute");
// const bookingoute = require("./routes/bookingRoute");
// const reviewRoute = require("./routes/reviewRoute");

require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// app.use("/user", userRoutes);
app.use("/auth", authRoute);
// app.use("/place", placeRoutes);
// app.use("/game", gameRoutes);
// app.use("/event", eventRoutes);
// app.use("/badge", badgeRoutes);
// app.use("/booking", bookingRoutes);
// app.use("/review", reviewRoutes);

app.listen(port, () => {
  console.log(`⚡️ [Server]: Server starting on port ${port}`);
});
