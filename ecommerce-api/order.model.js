const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    username: String,
    productName: String,
    category: String,
    quantity: Number,
    totalPrice: Number,
    orderDate: Date,
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"]
    }
});

module.exports = mongoose.model("Order", orderSchema);
