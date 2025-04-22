import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  Heart
} from 'lucide-react';

export default function OrganizationSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/organization/dashboard' },
    { icon: Package, label: 'Items', path: '/organization/items' },
    { icon: Calendar, label: 'Events', path: '/organization/events' },
    { icon: Users, label: 'Community', path: '/organization/community' },
    { icon: MessageSquare, label: 'Messages', path: '/organization/messages' },
    { icon: Users, label: 'Profile', path: '/organization/profile' },
    // { icon: Settings, label: 'Settings', path: '/organization/settings' },
  ];
  const navigate = useNavigate()
  const HandleLogout = () => {
    alert("logged out")
    localStorage.removeItem("orgid")
    navigate("/organization/login")
  }
  return (
    <div className="w-64 bg-green-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">EcoSwap Organization </h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isActive
                  ? 'bg-green-700 text-white'
                  : 'text-green-100 hover:bg-green-700'
                }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 w-52">
        <button
          className="flex items-center space-x-3 px-4 py-2 rounded-lg text-green-100 hover:bg-green-700 w-full"
          onClick={HandleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}