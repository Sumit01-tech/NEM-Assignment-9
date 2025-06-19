const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    username: String,
    workoutType: String,
    duration: Number,
    caloriesBurned: Number,
    workoutDate: Date,
    intensity: String
});

module.exports = mongoose.model("Workout", workoutSchema);
