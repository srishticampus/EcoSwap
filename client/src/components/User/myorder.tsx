import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const buyerId = localStorage.getItem("userid");

  useEffect(() => {
    if (buyerId) {
      axios
        .get(`http://localhost:8000/orderHistory/${buyerId}`)
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [buyerId]);

  const handleRatingChange = (productId, field, value) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const submitRating = async (productId) => {
    const { rating, review } = ratings[productId] || {};
    try {
      await axios.post(`http://localhost:8000/addRating/${productId}`, {
        userId: buyerId,
        rating,
        review,
      });
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-5">
      <h2 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-2 mt-5 pt-5">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => {
            const product = order?.product;
            const seller = order?.seller;
            const productId = product?._id;

            return (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
                <img
                  src={`http://localhost:8000/upload/${product.image?.filename}`}
                  alt={product?.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-800">{product?.title}</h3>
                  <p className="text-gray-700 mt-2">{product?.description}</p>
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Category:</span> {product?.category}</p>
                    <p><span className="font-medium">Code:</span> {product?.productcode}</p>
                    <p><span className="font-medium">Quantity:</span> {product?.productquantity}</p>
                    <p><span className="font-medium">Price:</span> ₹{order?.price}</p>
                    <p><span className="font-medium">Payment:</span> {order?.paymentStatus}</p>
                    <p><span className="font-medium">Ordered:</span> {new Date(order?.orderedAt).toLocaleString()}</p>
                  </div>

                  <div className="mt-4 border-t border-green-200 pt-3">
                    <h4 className="text-green-700 font-semibold">Seller Info</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>{seller?.organizationname}</strong></p>
                      <p>{seller?.email}</p>
                      <p>{seller?.mobile}</p>
                      <p>{seller?.city} {seller?.district}</p>
                    </div>
                  </div>

                  {/* Rating Form */}
                  <div className="mt-5 border-t pt-3">
                    <h4 className="text-green-700 font-semibold mb-2">Rate this Product</h4>
                    <select
                      className="border rounded px-2 py-1 mb-2 w-full"
                      value={ratings[productId]?.rating || ""}
                      onChange={(e) => handleRatingChange(productId, "rating", e.target.value)}
                    >
                      <option value="">Select Rating</option>
                      {[1, 2, 3, 4, 5].map((val) => (
                        <option key={val} value={val}>{val} Star</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Write a review"
                      className="border rounded px-2 py-1 mb-2 w-full"
                      value={ratings[productId]?.review || ""}
                      onChange={(e) => handleRatingChange(productId, "review", e.target.value)}
                    />
                    <button
                      onClick={() => submitRating(productId)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Submit Rating
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
