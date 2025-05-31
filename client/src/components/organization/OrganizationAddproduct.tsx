import React, { useState } from 'react';
import axios from 'axios';
import OrganizationSidebar from './OrganizationSidebar';

function OrganizationAddproduct() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: null,
    productquantity: null,
    productcode: '',
    addedByType: 'organizations',
    addedBy: localStorage.getItem('orgid'),
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === 'productquantity' ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const { title, description, category, price, productquantity, productcode, image } = data;

    if (!title || !description || !category || !price || !productquantity || !productcode || !image) {
      alert('All fields are required.');
      return false;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert('Price must be a valid number greater than 0.');
      return false;
    }

    if (isNaN(productquantity) || Number(productquantity) <= 0) {
      alert('Product quantity must be a valid number greater than 0.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('productquantity', data.productquantity);
      formData.append('productcode', data.productcode);
      formData.append('addedByType', data.addedByType);
      formData.append('addedBy', data.addedBy);
      formData.append('image', data.image);

      const response = await axios.post('http://localhost:8000/product/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success === true) {
        setShowModal(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log('error in frontend', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OrganizationSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold text-gray-900">ADD ITEM</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-900">Product Name</label>
                  <input
                    onChange={handlechange}
                    value={data.title}
                    type="text"
                    name="title"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900"
                  />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-900">Product description</label>
                  <textarea
                    onChange={handlechange}
                    value={data.description}
                    name="description"
                    rows="3"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900"
                  />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-900">Product picture</label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <label className="relative cursor-pointer bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="image"
                          className="sr-only"
                          onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                        />
                      </label>
                      <p className="text-xs text-gray-600 mt-2">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">Price</label>
                  <input
                    type="text"
                    onChange={handlechange}
                    value={data.price}
                    name="price"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">Category</label>
                  <input
                    type="text"
                    onChange={handlechange}
                    value={data.category}
                    name="category"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">Quantity</label>
                  <input
                    type="number"
                    onChange={handlechange}
                    value={data.productquantity}
                    name="productquantity"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-900">Product Code</label>
                  <input
                    onChange={handlechange}
                    value={data.productcode}
                    name="productcode"
                    type="text"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold text-gray-900">Cancel</button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm w-full">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
                <svg className="size-8 text-green-600" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Product added successfully!</h3>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default OrganizationAddproduct;
