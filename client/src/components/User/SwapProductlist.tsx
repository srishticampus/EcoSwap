import React, { useState, useEffect } from "react";
import axios from "axios";

const SwapProductlist = ({url}) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedOfferedProduct, setSelectedOfferedProduct] = useState("");
  const [swapTargetProduct, setSwapTargetProduct] = useState(null);

  const loggedUserId = localStorage.getItem("userid");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product/all");
      if (response.data.success) {
        // Filter out own products from public list
        const otherUserProducts = response.data.data.filter(
          (product) => product.addedBy._id !== loggedUserId && product.addedByType === 'users' && product.isAvailable === true
        );
        setProducts(otherUserProducts);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const openSwapModal = async (targetProductId) => {
    setSelectedProductId(targetProductId);
    setSwapTargetProduct(targetProductId);

    try {
      const res = await axios.get(`http://localhost:8000/ourproduct/${loggedUserId}`);
      if (res.data.success) {
        setUserProducts(res.data.data); // logged-in user's products
      }
    } catch (err) {
      console.error("Failed to fetch your products", err);
    }

    setShowModal(true);
  };

  const closeSwapModal = () => {
    setShowModal(false);
    setSelectedOfferedProduct("");
  };

  const handleSwapRequest = async () => {
    if (!selectedOfferedProduct || !swapTargetProduct) {
      alert("Please select a product to offer.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/swap/request", {
        productId: swapTargetProduct,           // product you want to receive
        offeredBy: loggedUserId,                // you (the logged in user)
        offeredItemId: selectedOfferedProduct   // your product you offer
      });

      if (response.data.success) {
        alert("Swap request sent successfully!");
        closeSwapModal();
        fetchAllProducts()
      } else {
        alert("Failed to send swap request.");
      }
    } catch (err) {
      console.error("Error sending swap request", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Available Products for Swap</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`${url}/upload/${product.image.filename}`}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-1">Price: ₹{product.price}</p>
            <button
              onClick={() => openSwapModal(product._id)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Swap Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Choose Your Product to Swap</h2>

            <select
              value={selectedOfferedProduct}
              onChange={(e) => setSelectedOfferedProduct(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4"
            >
              <option value="">-- Select Your Product --</option>
              {userProducts.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeSwapModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
              >
                Send Swap Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapProductlist;
