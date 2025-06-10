import React, { useEffect, useState } from "react";
import { Settings, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profile({ url }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userid = localStorage.getItem("userid"); // or however you store user ID
        const res = await axios.get(`http://localhost:8000/viewuser/${userid}`);
        console.log(res);

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="h-32 bg-green-600"></div>
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={`${url}/upload/${user?.profilepic?.filename}`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white -mt-16"
              />
              <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-2xl font-bold">
                  {user?.fullname || "User Name"}
                </h1>
                <p className="text-gray-600">
                  Eco Enthusiast | {user?.district}
                </p>
                <p className="text-gray-600"> {user?.email}, </p>
                <p className="text-gray-600"> {user?.gender},</p>
                <p className="text-gray-600"> {user?.mobile},</p>
                <p className="text-gray-600">
                  {user?.city}, {user?.district}, {user?.pincode}
                </p>
                <div className="mt-4 flex gap-4">
                  <Link
                    to="/user/profileedit"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Link>
                  <Link to="/userchat">
                    {" "}
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Message
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
