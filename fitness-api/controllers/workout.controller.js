const Workout = require("../models/workout.model");

// Add workout
exports.addWorkout = async (req, res) => {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ error: "Bad request" });
    }
};

// Top 3 most common workout types
exports.topWorkouts = async (req, res) => {
    try {
        const data = await Workout.aggregate([
            { $group: { _id: "$workoutType", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Average calories burned per workout type
exports.averageCalories = async (req, res) => {
    try {
        const data = await Workout.aggregate([
            { $group: { _id: "$workoutType", avgCalories: { $avg: "$caloriesBurned" } } }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Distribution by intensity level
exports.intensityDistribution = async (req, res) => {
    try {
        const data = await Workout.aggregate([
            { $group: { _id: "$intensity", count: { $sum: 1 } } }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Weekly activity count
exports.weeklyActivity = async (req, res) => {
    try {
        const data = await Workout.aggregate([
            {
                $group: {
                    _id: { $isoWeek: "$workoutDate" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Top performing users by total workout time
exports.topUsers = async (req, res) => {
    try {
        const data = await Workout.aggregate([
            { $group: { _id: "$username", totalTime: { $sum: "$duration" } } },
            { $sort: { totalTime: -1 } },
            { $limit: 5 }
        ]);
        res.status(200).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
