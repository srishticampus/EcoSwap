import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    {
      id: 1,
      title: "Eco-friendly Water Bottle",
      description: "Reusable stainless steel water bottle",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      location: "New York, NY",
      owner: "Jane Smith"
    },
    {
      id: 2,
      title: "Bamboo Cutlery Set",
      description: "Portable bamboo utensils for eco-conscious dining",
      image: "https://images.unsplash.com/photo-1584346133934-a3bd1c5de919?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      location: "Los Angeles, CA",
      owner: "John Doe"
    },
    // Add more products as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ArrowUpDown className="h-5 w-5 mr-2" />
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{product.location}</p>
                    <p>Listed by {product.owner}</p>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}