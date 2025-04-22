import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Package, 
  Settings,
  LogOut,
  AlertCircle,
  BarChart3
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Swappers', path: '/admin/swappers' },
    { icon: Building2, label: 'Organizations', path: '/admin/organizations' },
    { icon: Package, label: 'Items', path: '/admin/items' },
    // { icon: AlertCircle, label: 'Reports', path: '/admin/reports' },
    // { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    // { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];
  const navigate = useNavigate()
  const handleLogout = () => {
    alert("logged out")
    localStorage.removeItem("adminId")
    navigate("/admin/login")
  }

  return (
    <div className="w-64 bg-green-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">EcoSwap Admin</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive 
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
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}