import React, { useState } from 'react';
import OrganizationSidebar from './OrganizationSidebar';

const OrganisationAddProduct: React.FC = () => {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productCode, setProductCode] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      productImage,
      productName,
      productDescription,
      price,
      quantity,
      productCode,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OrganizationSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-green-50 file:text-green-700
                         hover:file:bg-green-100"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                         py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                         py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {/* Price and Quantity */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                           py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Product Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
            <input
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                         py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                         text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default OrganisationAddProduct;
