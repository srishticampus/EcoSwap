import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationSidebar from './OrganizationSidebar';

function Organizationviewproducts({ url }) {
  const [products, setProducts] = useState([]);
  const [editdetails, setEditdetails] = useState({});
  const [editbutton, setEditbutton] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const ownerId = localStorage.getItem("orgid");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/ourproduct/${ownerId}`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleEdit = async (product) => {
    try {
      const res = await axios.get(`${url}/product/${product._id}`);
      if (res.data.success) {
        setEditdetails(res.data.data);
        setEditbutton(true);
      }
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditdetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEditdetails((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
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
      await axios.put(`${url}/product/update/${editdetails._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditbutton(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${url}/product/delete/${selectedItem._id}`);
      setShowDeleteModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OrganizationSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">My Products</h1>

        {editbutton && (
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl font-bold mb-4 text-green-700">Edit Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="title"
                value={editdetails.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="border p-2 rounded"
                required
              />
              <input
                name="price"
                value={editdetails.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="border p-2 rounded"
                required
              />
              <input
                name="productcode"
                value={editdetails.productcode}
                onChange={handleInputChange}
                placeholder="Product Code"
                className="border p-2 rounded"
                required
              />
              <input
                name="productquantity"
                value={editdetails.productquantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="border p-2 rounded"
                required
              />
              <textarea
                name="description"
                value={editdetails.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 rounded col-span-2"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="col-span-2"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Update
            </button>
          </form>
        )}

        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={`${url}/upload/${product?.image?.filename}`}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-green-700">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-800">
                    <span>₹{product.price}</span>
                    <span>Rating: {product.rating || "4.5"} ★</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Code: {product.productcode || "N/A"}
                  </p>
                  {product.isAvailable === false ? (
                    <span className="text-red-500 font-bold">Sold Out</span>
                  ): <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(product)}
                      className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>}
                 
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Organizationviewproducts;
