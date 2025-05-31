const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    productquantity: {

        type: String,
        required: true

    },
    productcode: {
        type: String,
        required: true
    },
    swapAvailable: {
        type: Boolean,
        default: function () {
            return this.addedByType === 'users';
        }
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByType'
    },
    addedByType: {
        type: String,
        required: true,
        enum: ['users', 'organizations']
    },
    ratings: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            rating: { type: Number, min: 1, max: 5 },
            review: { type: String }
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
