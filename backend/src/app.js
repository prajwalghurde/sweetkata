const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Sweet Shop API running..."));


app.use("/api/auth", authRoutes);

app.use("/api/sweets", sweetRoutes);

app.use("/api/sweets", inventoryRoutes);

module.exports = app;
