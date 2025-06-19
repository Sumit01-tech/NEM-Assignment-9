const express = require("express");
const router = express.Router();
const controller = require("../controllers/workout.controller");

router.post("/workouts", controller.addWorkout);
router.get("/analytics/top-workouts", controller.topWorkouts);
router.get("/analytics/average-calories", controller.averageCalories);
router.get("/analytics/intensity-distribution", controller.intensityDistribution);
router.get("/analytics/weekly-activity", controller.weeklyActivity);
router.get("/analytics/top-performing-users", controller.topUsers);

module.exports = router;
