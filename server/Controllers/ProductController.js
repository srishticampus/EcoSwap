const Product = require("../Models/Productschema");

const SwapRequest = require("../Models/Swapschema");

const Order = require("../Models/Orderschema")

const multer = require('multer');

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.uploadimg = multer({ storage: storage }).single("image");

// 1. Add Product
exports.addProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            price,
            addedBy,
            addedByType,
            productquantity,
            productcode
        } = req.body;

        const image = req.file;
        if (!image) return res.status(400).json({ error: "Product image is required" });

        // Validate Organization price
        if (addedByType === 'Organization' && !price) {
            return res.status(400).json({ error: "Price is required for products added by organizations" });
        }

        const product = new Product({
            title,
            description,
            category,
            price,
            productquantity,
            productcode,
            image,
            swapAvailable: addedByType === 'users',
            addedBy,
            addedByType
        });

        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 2. Create Swap Request
exports.createSwapRequest = async (req, res) => {
    try {
        const { productId, offeredBy, offeredItemId } = req.body;
        const product = await Product.findById({ _id: productId });
        if (!product) return res.status(404).json({ error: "Product not found" });
        const swap = new SwapRequest({
            productId,
            offeredBy,
            offeredItemId,
            status: 'Pending',
        });

        await swap.save();
        product.isAvailable = false;
await product.save();
        res.status(201).json({ success: true, data: swap });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. View All Products
exports.viewAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("addedBy");
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. View Swap Pending Requests (for product owner)
exports.viewSwapPendingRequests = async (req, res) => {
    try {
        const { userId } = req.params;

        const userProducts = await Product.find({ addedBy: userId, addedByType: 'users' });
        const productIds = userProducts.map(p => p._id);

        const pendingSwaps = await SwapRequest.find({
            productId: { $in: productIds },
            status: 'Pending'
        }).populate("productId offeredBy offeredItemId");

        res.status(200).json({ success: true, data: pendingSwaps });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. View Swap Accepted Requests (for a user)
exports.viewSwapAcceptedRequests = async (req, res) => {
    try {
        const { userId } = req.params;

        const swaps = await SwapRequest.find({
            offeredBy: userId,
            status: 'Accepted'
        }).populate("productId offeredItemId");

        res.status(200).json({ success: true, data: swaps });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 6. Accept Swap Request
exports.acceptSwapRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await SwapRequest.findById(requestId);
        if (!request) return res.status(404).json({ error: "Swap request not found" });

        request.status = 'Accepted';
        await request.save();

        await Product.findByIdAndUpdate(request.productId, { swapAvailable: false });
        await Product.findByIdAndUpdate(request.offeredItemId, { swapAvailable: false });

        res.status(200).json({ success: true, message: "Swap accepted", data: request });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 7. View One Product
exports.viewOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("addedBy");
        if (!product) return res.status(404).json({ error: "Product not found" });

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 8. Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 9. Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (req.file) {
            updatedData.image = req.file;
        }

        const product = await Product.findByIdAndUpdate(id, updatedData,{isAvailable:true}, { new: true });
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.rejectSwapRequest = async (req, res) => {
  try {
    await SwapRequest.findByIdAndDelete(req.params.requestId);
    res.json({ success: true, message: "Swap request rejected" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// 10. Add Rating and Review
exports.addRating = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId, rating, review } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        // Check if user has already rated
        const existingRating = product.ratings.find(r => r.user.toString() === userId);
        if (existingRating) {
            existingRating.rating = rating;
            existingRating.review = review;
        } else {
            product.ratings.push({ user: userId, rating, review });
        }

        await product.save();
        res.status(200).json({ success: true, message: "Rating added", data: product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 11. Get All Products by a users or Organization
exports.getProductsByOwner = async (req, res) => {
    console.log(req.params.ownerId);

    try {
        const { ownerId } = req.params;
        const products = await Product.find({ addedBy: ownerId }).populate("addedBy");
        res.status(200).json({ success: true, data: products });
        console.log(products, "products");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// order
// 12. Buy Product

exports.buyProduct = async (req, res) => {
    console.log(req.body, "req.body");

    try {
        const { productId, buyerId } = req.body;

        const product = await Product.findById({ _id: productId });
        if (!product) return res.status(404).json({ error: "Product not found" });

        // Prevent buying if already swapped
        // if (!product.swapAvailable) return res.status(400).json({ error: "Product is not available for buying" });

        // Mock payment success (can integrate real payment gateway here)
        const paymentStatus = 'Paid';

        const order = new Order({
            product: product._id,
            buyer: buyerId,
            seller: product.addedBy,
            sellerType: product.addedByType,
            price: product.price,
            paymentStatus,
        });

        await order.save();
        product.isAvailable = false;
        await product.save();
        res.status(201).json({ success: true, message: "Product ordered successfully", data: order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 13. View Orders for Product Owner (users or organizations)
exports.viewOrdersForOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const orders = await Order.find({ seller: ownerId })
            .populate("product buyer")
            .sort({ orderedAt: -1 });

        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 14. View Order History for a Buyer
exports.viewOrderHistory = async (req, res) => {
    try {
        const { buyerId } = req.params;

        const orders = await Order.find({ buyer: buyerId })
            .populate("product seller")
            .sort({ orderedAt: -1 });

        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 15. Accept/Reject Order by Seller
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) return res.status(404).json({ error: "Order not found" });

        res.status(200).json({ success: true, message: `Order ${status.toLowerCase()}`, data: order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
