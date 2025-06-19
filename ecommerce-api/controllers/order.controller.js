const Order = require("../models/order.model");

// Insert order
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: "Bad request" });
    }
};

// Top 3 best-selling products (by quantity)
exports.getTopProducts = async (req, res) => {
    try {
        const data = await Order.aggregate([
            { $group: { _id: "$productName", totalQty: { $sum: "$quantity" } } },
            { $sort: { totalQty: -1 } },
            { $limit: 3 }
        ]);
        if (data.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(data);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Revenue by category
exports.getRevenueByCategory = async (req, res) => {
    try {
        const data = await Order.aggregate([
            { $group: { _id: "$category", revenue: { $sum: "$totalPrice" } } }
        ]);
        if (data.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(data);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Average order value
exports.getAverageOrderValue = async (req, res) => {
    try {
        const data = await Order.aggregate([
            { $group: { _id: null, avgOrderValue: { $avg: "$totalPrice" } } }
        ]);
        if (data.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(data[0]);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Orders per month
exports.getOrdersPerMonth = async (req, res) => {
    try {
        const data = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        if (data.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(data);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Cancellation rate
exports.getCancellationRate = async (req, res) => {
    try {
        const data = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    cancelled: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    cancellationRate: {
                        $multiply: [{ $divide: ["$cancelled", "$total"] }, 100]
                    }
                }
            }
        ]);
        if (data.length === 0) return res.status(200).json({ message: "No data found" });
        res.status(200).json(data[0]);
    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};
