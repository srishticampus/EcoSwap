// Models/OrderSchema.js
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, refPath: "sellerType", required: true },
    sellerType: { type: String, enum: ['users', 'organizations'], required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: "Pending" },
    paymentStatus: { type: String, enum: ['Paid', 'Failed'], default: "Paid" }, // Mocked
    price: { type: Number, required: true },
    orderedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("orders", OrderSchema);
