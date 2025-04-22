import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Home,
    User,
    ShoppingCart,
    Box,
    ClipboardList,
    MessageCircle,
    Menu,
    Leaf,
    LogIn,
    X,
} from "lucide-react";

export default function UserNavbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("logged out")
        localStorage.removeItem("userid");
        // Add any other keys you need to clear
        navigate("/user/login");
    };

    const navItems = [
        { to: "/user/homepage", label: "Home", icon: <Home className="mr-2 h-5 w-5" /> },
        { to: "/user/profile", label: "Profile", icon: <User className="mr-2 h-5 w-5" /> },
        { to: "/user/orders", label: "Orders", icon: <ShoppingCart className="mr-2 h-5 w-5" /> },
        { to: "/user/products", label: "Products", icon: <Box className="mr-2 h-5 w-5" /> },
        { to: "/user/requests", label: "Requests", icon: <ClipboardList className="mr-2 h-5 w-5" /> },
        { to: "/user/complaints", label: "Complaints", icon: <MessageCircle className="mr-2 h-5 w-5" /> },
    ];

    return (
        <nav className="bg-green-50 fixed w-full z-20 top-0 left-0 border-b border-green-100">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                {/* Brand */}
                <Link to="/" className="flex items-center">
                    <Leaf className="text-green-600 h-8 w-8 mr-2" />
                    <span className="text-2xl font-semibold text-green-800">EcoSwap</span>
                </Link>

                {/* Hamburger for mobile */}
                <button
                    className="text-green-700 md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Nav items */}
                <ul
                    className={`mt-4 md:mt-0 md:flex md:items-center ${open ? "block" : "hidden"}`}
                >
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
                    {/* Logout Button */}
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
