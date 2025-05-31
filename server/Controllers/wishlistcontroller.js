const Wishlist = require('../Models/Whishlistschema');
const Product = require('../Models/Productschema'); // Assuming you have this model

// Add to wishlist
const addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        // Check if product already exists
        if (wishlist.products.includes(productId)) {
            return res.status(200).json({ message: "Already in wishlist" });
        }

        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
        await wishlist.save();

        res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get wishlist (optional)
const getWishlistByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlistByUser
};
