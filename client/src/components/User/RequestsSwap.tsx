import React, { useEffect, useState } from "react";
import axios from "axios";

function RequestsSwap({ url }) {
  const [swapItems, setSwapItems] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/swap/pending/${userId}`);
      if (res.data.success) {
        setSwapItems(res.data.data); // Make sure backend returns a 'data' array
      }
    } catch (err) {
      console.error("Failed to fetch pending swap requests", err);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const res = await axios.put(`http://localhost:8000/swap/accept/${requestId}`);
      if (res.data.success) {
        alert("Request accepted");
        fetchPendingRequests(); // Refresh the list
      }
    } catch (err) {
      console.error("Accept failed", err);
      alert("Error accepting request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/swap/reject/${requestId}`);
      if (res.data.success) {
        alert("Request rejected");
        fetchPendingRequests(); // Refresh the list
      }
    } catch (err) {
      console.error("Reject failed", err);
      alert("Error rejecting request");
    }
  };

  return (
    <div className="mt-24 p-6 rounded-lg shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Swap Requests</h2>

      {swapItems?.length === 0 ? (
        <p className="text-center text-gray-500">No pending swap requests.</p>
      ) : (
        swapItems.map((item, idx) => (
          <div
            className="flex flex-col p-4 md:flex-row gap-6 mb-4 bg-green-100 rounded-lg"
            key={idx}
          >
            <div className="flex-shrink-0">
              <img
                src={`${url}/upload/${item?.offeredItemId?.image?.filename}`}
                alt="Product"
                className="w-48 h-48 object-cover rounded"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{item?.offeredItemId?.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item?.offeredItemId?.description}</p>
              </div>

              <div className="flex items-center flex-wrap gap-6 text-sm text-gray-700">
                <span>Price: <strong>₹{item?.offeredItemId?.price}</strong></span>
                <span>Qty: <strong>{item?.offeredItemId?.productquantity || "N/A"}</strong></span>
                <span>Code: <strong>{item?.offeredItemId?.productcode || "N/A"}</strong></span>
                <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded ml-auto">
                  {item?.offeredItemId?.rating || "4.5"} ★
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                  onClick={() => handleAccept(item?._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                  onClick={() => handleReject(item?._id)}
                >
                  Reject
                </button>
              </div>
              <h5>Swap with your product                 <h3 className="text-lg font-semibold">{item?.productId?.title}</h3>
              </h5><span>Price: <strong>₹{item?.productId?.price}</strong> </span>
              <span>Qty: <strong>{item?.productId?.productquantity || "N/A"}</strong> </span>
              <span>Code: <strong>{item?.productId?.productcode || "N/A"}</strong> </span>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RequestsSwap;
