const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/order.routes");
const app = express();

app.use(express.json());
app.use("/", orderRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("MongoDB connection failed"));

module.exports = app;
