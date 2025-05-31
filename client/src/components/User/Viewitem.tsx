import React, { useEffect, useState } from "react";
import axios from "axios";

function Viewitem({ url }) {
  const [data, setData] = useState([]);
  const [editdetails, setEditdetails] = useState({});
  const [editbutton, setEditbutton] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const ownerId = localStorage.getItem("userid"); // assuming user ID is stored in localStorage

  const showData = async () => {
    console.log(ownerId, "ownerId");

    try {
      const response = await axios.get(`http://localhost:8000/ourproduct/${ownerId}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching owner's products:", error);
    }
  };

  useEffect(() => {
    if (ownerId) {
      showData();
    }
  }, [ownerId]);

  const handleEdit = async (val) => {
    const id = val._id;
    setEditbutton(true);
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`); // updated API
      setEditdetails(response.data.data); // Set the full product details
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setEditbutton(false);

    const formData = new FormData();
    formData.append("title", editdetails.title);
    formData.append("description", editdetails.description);
    formData.append("price", editdetails.price);
    formData.append("productcode", editdetails.productcode);
    formData.append("productquantity", editdetails.productquantity);
    if (editdetails.imageFile) {
      formData.append("image", editdetails.imageFile);
    }

    try {
      await axios.put(
        `http://localhost:8000/product/update/${editdetails._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      showData();
    } catch (error) {
      console.error("Error updating data with image:", error);
    }
  };


  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:8000/product/delete/${selectedItem._id}`);
      setShowDeleteModal(false);
      showData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="relative rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 bg-green-50 mt-4"
          >
            {item.isAvailable === false ? (
              <span className="text-red-500 font-bold">Sold Out</span>
            ) : <div className="flex gap-2 mt-3">
              <button
                onClick={() => confirmDelete(item)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ❌
              </button>

              <button
                className="absolute top-2 right-10 text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit(item)}
              >
                ✏️
              </button>
            </div>}


            <img
              src={`${url}/upload/${item?.image?.filename}`}
              alt="loading.."
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item?.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item?.description}</p>
              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p>Price: {item?.price}/-</p>
                <p>Product Code: {item.productcode}</p>
                <p>Quantity: {item.productquantity}</p>
              </div>
              <div className="flex justify-end mt-2">
                <div className="bg-green-500 text-white text-xs font-semibold rounded flex items-center justify-center w-12 h-5">
                  {item.ratings} ★
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit and Delete Modals (same as before) */}
      {editbutton && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={editdetails.title || ""}
                onChange={(e) => setEditdetails({ ...editdetails, title: e.target.value })}
                className="w-full mb-3 border p-2 rounded"
                placeholder="Product Name"
                required
              />
              <textarea
                name="description"
                value={editdetails.description || ""}
                onChange={(e) => setEditdetails({ ...editdetails, description: e.target.value })}
                className="w-full mb-3 border p-2 rounded"
                placeholder="Product Description"
                required
              />
              <input
                type="text"
                name="price"
                value={editdetails.price || ""}
                onChange={(e) => setEditdetails({ ...editdetails, price: e.target.value })}
                className="w-full mb-3 border p-2 rounded"
                placeholder="Price"
                required
              />
              <input
                type="text"
                name="productcode"
                value={editdetails.productcode || ""}
                onChange={(e) => setEditdetails({ ...editdetails, productcode: e.target.value })}
                className="w-full mb-3 border p-2 rounded"
                placeholder="Product Code"
                required
              />
              <input
                type="file"
                onChange={(e) =>
                  setEditdetails({ ...editdetails, imageFile: e.target.files[0] })
                }
                className="w-full mb-3 border p-2 rounded"
              />

              <input
                type="text"
                name="productquantity"
                value={editdetails.productquantity || ""}
                onChange={(e) => setEditdetails({ ...editdetails, productquantity: e.target.value })}
                className="w-full mb-6 border p-2 rounded"
                placeholder="Quantity"
                required
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                <button type="button" onClick={() => setEditbutton(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewitem;
