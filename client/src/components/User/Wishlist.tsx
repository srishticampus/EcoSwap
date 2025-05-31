import React, { useState, useEffect } from "react";
import axios from "axios";

function Wishlist({url}) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = localStorage.getItem("userid"); // get userId from localStorage

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/wishlist/${userId}`);
        setWishlistItems(res.data.products); // assuming res.data is an array of wishlist items
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

 const handleRemove = async (productId) => {
    try {
      await axios.post("http://localhost:8000/wishlist/remove", {
        userId,
        productId,
      });

      // Update frontend list
      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <button  onClick={() => handleRemove(item._id)} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
              ❌
            </button>

            <img
              src={`${url}/upload/${item?.image?.filename}`} // adjust image path
              alt={item.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>

              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p>Price: ${item.price}</p>
                <p>Product Code: {item.productcode}</p>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <p className="text-sm text-gray-700">Quantity:</p>
                <div className="flex items-center border rounded overflow-hidden">
                  {item.productquantity}
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <div className="bg-green-500 text-white text-xs font-semibold rounded flex items-center justify-center w-12 h-5">
                  {item.rating} ★
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
