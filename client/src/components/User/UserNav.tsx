import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  ShoppingCart,
  ClipboardList,
  Menu,
  Leaf,
  LogIn,
  X,
  Box,
  ChevronDown,
  Mail,
} from "lucide-react";

export default function UserNavbar() {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("logged out");
    localStorage.removeItem("userid");
    navigate("/user/login");
  };
  useEffect(() => {
    
  },)
  const navItems = [
    { to: "/user/homepage", label: "Home", icon: <Home className="mr-2 h-5 w-5" /> },
    { to: "/user/profile", label: "Profile", icon: <User className="mr-2 h-5 w-5" /> },
    // { to: "/user/category/WishList", label: "Whishlist", icon: <Heart className="mr-2 h-5 w-5" /> },
  ];

  return (
    <nav className="bg-green-50 fixed w-full z-20 top-0 left-0 border-b border-green-100">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <Leaf className="text-green-600 h-8 w-8 mr-2" />
          <span className="text-2xl font-semibold text-green-800">EcoSwap</span>
        </Link>

        <button
          className="text-green-700 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <ul className={`mt-4 md:mt-0 md:flex md:items-center ${open ? "block" : "hidden"}`}>
          {navItems.map(({ to, label, icon }) => (
            <li key={to} className="md:ml-6">
              <Link
                to={to}
                className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
              >
                {icon}
                <span className="text-green-800">{label}</span>
              </Link>
            </li>
          ))}

          <li className="relative md:ml-6">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg w-full"
            >
              <Box className="mr-2 h-5 w-5" />
              <span className="text-green-800 flex items-center">
                Dashboard <ChevronDown className="ml-1 h-4 w-4" />
              </span>
            </button>

            {categoryOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white border border-green-100 rounded shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/user/category/AddItem"
                      onClick={() => setCategoryOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                      Add Item
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/category/viewItem"
                      onClick={() => setCategoryOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                      View Item
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="/user/myorder"
                      onClick={() => setCategoryOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                      My Orders
                    </Link>
                  </li> 
                   <li>
                    <Link
                      to="/user/category/WishList"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                     Wishlist
                    </Link>
                  </li> 
                   <li>
                    <Link
                      to="/user/viewevents"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                     Events
                    </Link>
                  </li> 
                  <li>
                    <Link
                      to="/user/complaints"
                      onClick={() => setCategoryOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                    Complaints
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="md:ml-6">
            <Link
              to="/user/swap/product"
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5 text-green-700" />
              <span className="text-green-800">SwapItem</span>
            </Link>
          </li>
          <li className="md:ml-6">
            <Link
              to="/userchat"
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5 text-green-700" />
              <span className="text-green-800">Chat</span>
            </Link>
          </li>
           <li className="md:ml-6">
            <Link
              to="/user/product"
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5 text-green-700" />
              <span className="text-green-800"> Products</span>
            </Link>
          </li>


          <li className="relative md:ml-6">
            <button
              onClick={() => setRequestsOpen(!requestsOpen)}
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg w-full"
            >
              <ClipboardList className="mr-2 h-5 w-5" />
              <span className="text-green-800 flex items-center">
                Requests <ChevronDown className="ml-1 h-4 w-4" />
              </span>
            </button>

            {requestsOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white border border-green-100 rounded shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/user/requests/swap"
                      onClick={() => setRequestsOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                      Swap request
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/user/requests/exchange"
                      onClick={() => setRequestsOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                      Exchange request
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/user/swap/acceptedproduct"
                      onClick={() => setRequestsOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-100"
                    >
                      Accepted request
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>


          {/* <li className="md:ml-6">
            <Link
              to="/user/complaints"
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              <span className="text-green-800">Complaints</span>
            </Link>
          </li> */}

          <li className="md:ml-6">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <LogIn className="mr-2 h-5 w-5" />
              <span className="text-green-800">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}




{/* sidebar code
  import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  ShoppingCart,
  ClipboardList,
  MessageCircle,
  Menu,
  Leaf,
  LogIn,
  X,
  Box,
  ChevronDown,
  Star
} from "lucide-react";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("logged out");
    localStorage.removeItem("userid");
    navigate("/user/login");
  };

  const navItems = [
    { to: "/user/homepage", label: "Home", icon: <Home className="h-5 w-5" /> },
    { to: "/user/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { to: "/user/myorder", label: "Orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { to: "/user/complaints", label: "MyReviews", icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { to: "/user/complaints", label: "Complaints", icon: <MessageCircle className="h-5 w-5" /> }
  ];

  return (
    <div className="flex">
      {/* Sidebar 
      <aside className="fixed top-0 left-0 h-screen w-64 bg-green-50 border-r border-green-100 p-4 z-30">
        <div className="flex items-center mb-8">
          <Leaf className="text-green-600 h-8 w-8 mr-2" />
          <span className="text-2xl font-semibold text-green-800">EcoSwap</span>
        </div>

        <ul className="space-y-2">
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-3 px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <span className="flex items-center gap-3">
                <Box className="h-5 w-5" /> Category
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {categoryOpen && (
              <ul className="pl-6 mt-2 space-y-1">
                <li><Link to="/user/category/AddItem" className="block text-green-700 hover:underline">Add Item</Link></li>
                <li><Link to="/user/category/viewItem" className="block text-green-700 hover:underline">View Item</Link></li>
                <li><Link to="/user/category/Category" className="block text-green-700 hover:underline">Category</Link></li>
                <li><Link to="/user/category/WishList" className="block text-green-700 hover:underline">WishList</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => setRequestsOpen(!requestsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg"
            >
              <span className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5" /> Requests
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {requestsOpen && (
              <ul className="pl-6 mt-2 space-y-1">
                <li><Link to="/user/requests/swap" className="block text-green-700 hover:underline">Swap Request</Link></li>
                <li><Link to="/user/requests/exchange" className="block text-green-700 hover:underline">Exchange Request</Link></li>
                <li><Link to="/user/requests/borrow" className="block text-green-700 hover:underline">Borrow Request</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-green-700 hover:bg-green-100 rounded-lg w-full"
            >
              <LogIn className="h-5 w-5" /> Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content Placeholder
      <div className="ml-64 flex-1 p-6">
        {/* Your main page content goes here 
      </div>
    </div>
  );
}
 */}