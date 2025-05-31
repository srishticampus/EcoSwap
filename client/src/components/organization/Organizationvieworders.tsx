import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationSidebar from './OrganizationSidebar';

function Organizationvieworders({ url }) {
  const [orders, setOrders] = useState([]);
  const buyerId = localStorage.getItem("orgid");

  useEffect(() => {
    if (buyerId) {
      axios
        .get(`http://localhost:8000/viewOrdersForOwner/${buyerId}`)
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [buyerId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OrganizationSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">My Products</h1>

        {orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const product = order?.product;
              const buyer = order?.buyer;
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100"
                >
                  <img
                    src={`http://localhost:8000/upload/${product.image?.filename}`}
                    alt={product?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-green-800">{product?.title}</h3>
                    <p className="text-gray-700 mt-2">{product?.description}</p>
                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Category:</span> {product?.category}</p>
                      {/* <p><span className="font-medium">Code:</span> {product?.productcode}</p> */}
                      <p><span className="font-medium">Quantity:</span> {product?.productquantity}</p>
                      <p><span className="font-medium">Price:</span> ₹{order?.price}</p>
                      <p><span className="font-medium">Payment:</span> {order?.paymentStatus}</p>
                      <p><span className="font-medium">Ordered:</span> {new Date(order?.orderedAt).toLocaleString()}</p>
                    </div>

                    <div className="mt-4 border-t border-green-200 pt-3">
                      <h4 className="text-green-700 font-semibold">Buyer Info</h4>
                      <div className="text-sm text-gray-700 space-y-1 mt-2">
                        <p><strong>{buyer?.fullname}</strong></p>
                        <p>{buyer?.email}</p>
                        <p>{buyer?.mobile}</p>
                        <p>{buyer?.city} {buyer?.district}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </main>
    </div>
  );
}

export default Organizationvieworders;
