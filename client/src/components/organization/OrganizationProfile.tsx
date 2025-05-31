import React, { useEffect, useState } from 'react';
import { Settings, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrganizationSidebar from './OrganizationSidebar';

export default function OrganizationProfile({url}) {
 const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

   const fetchUser = async () => {
      try {
        const userid = localStorage.getItem("orgid"); // or however you store user ID
        const res = await axios.get(`http://localhost:8000/vieworganization/${userid}`);
        console.log(res);
        
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

  useEffect(() => {
   
    fetchUser();
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
            const userid = localStorage.getItem("orgid"); // or however you store user ID

    try {
      const res = await axios.get(`http://localhost:8000/ourproduct/${userid}`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <OrganizationSidebar/>
          </div>
    <div className="min-h-screen bg-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="h-32 bg-green-600"></div>
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={`${url}/upload/${user?.profilepic.filename}`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white -mt-16"
              />
              <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
  <h1 className="text-2xl font-bold">{user?.organizationname || 'Organization Name'}</h1>
  <p className="text-gray-600">{user?.email}</p>
  <p className="text-gray-600">{user?.mobile}</p>
  <p className="text-gray-600">{user?.district}, {user?.city}</p>
  <div className="mt-4 flex gap-4">
    <Link
      to="/organization/profileedit"
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      <Settings className="h-5 w-5 mr-2" />
      Edit Profile
    </Link>
    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
      <MessageCircle className="h-5 w-5 mr-2" />
      Message
    </button>
  </div>
</div>
</div>
          </div>
        </div>

     

        {/* Listed Items */}
        {/* <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Listed Items</h2>
              <Link
                to="/products/new"
                className="text-green-600 hover:text-green-700"
              >
                List New Item
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.status}</p>
                      <div className="mt-4 flex justify-end">
                        <button className="text-green-600 hover:text-green-700">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items listed yet.</p>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </div>
  );
}
