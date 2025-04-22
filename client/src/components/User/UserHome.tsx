import React from 'react';
import { Package, Heart, MessageCircle, Settings } from 'lucide-react';

export default function UserHome() {
  const recentItems = [
    {
      id: 1,
      title: "Eco-friendly Water Bottle",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      status: "Available"
    },
    {
      id: 2,
      title: "Bamboo Cutlery Set",
      image: "https://images.unsplash.com/photo-1584346133934-a3bd1c5de919?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      status: "Pending Swap"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-600">Eco Enthusiast</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-2 text-green-600 p-2 rounded-md bg-green-50">
                <Package className="h-5 w-5" />
                <span>My Items</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 p-2 rounded-md hover:bg-gray-50">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 p-2 rounded-md hover:bg-gray-50">
                <MessageCircle className="h-5 w-5" />
                <span>Messages</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 p-2 rounded-md hover:bg-gray-50">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Items Listed</h3>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Successful Swaps</h3>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Eco Impact</h3>
                <p className="text-3xl font-bold text-green-600">+24kg</p>
              </div>
            </div>

            {/* Recent Items */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Recent Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentItems.map(item => (
                  <div key={item.id} className="flex space-x-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.title} className="w-24 h-24 rounded-md object-cover" />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.status}</p>
                      <button className="mt-2 text-green-600 hover:text-green-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}