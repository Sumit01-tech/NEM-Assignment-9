const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout.routes");
const app = express();

app.use(express.json());
app.use("/", workoutRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/fitnessDB")
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("MongoDB connection failed"));

module.exports = app;
