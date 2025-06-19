const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");

router.post("/orders", controller.createOrder);
router.get("/analytics/top-products", controller.getTopProducts);
router.get("/analytics/revenue-by-category", controller.getRevenueByCategory);
router.get("/analytics/average-order-value", controller.getAverageOrderValue);
router.get("/analytics/orders-per-month", controller.getOrdersPerMonth);
router.get("/analytics/cancellation-rate", controller.getCancellationRate);

module.exports = router;
