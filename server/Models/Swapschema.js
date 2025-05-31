const mongoose = require("mongoose");

const SwapRequestSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    offeredItemId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("swaprequests", SwapRequestSchema);
