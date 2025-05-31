const mongoose=require("mongoose")
const WishlistSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
});

const Wishlist = mongoose.model("wishlists", WishlistSchema);
module.exports = Wishlist;
