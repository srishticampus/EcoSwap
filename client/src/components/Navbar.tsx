import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, LogIn, UserPlus, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-green-50 fixed w-full z-20 top-0 left-0 border-b border-green-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <Leaf className="text-green-600 h-8 w-8 mr-2" />
          <span className="self-center text-2xl font-semibold text-green-800">EcoSwap</span>
        </Link>
        
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-green-700 rounded-lg hover:bg-green-100"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link to="/products" className="block py-2 pl-3 pr-4 text-green-700 hover:text-green-900">
                Products
              </Link>
            </li>
            <li>
              <Link to="/login" className="flex items-center py-2 pl-3 pr-4 text-green-700 hover:text-green-900">
                <LogIn className="h-5 w-5 mr-1" />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center py-2 pl-3 pr-4 text-green-700 hover:text-green-900">
                <UserPlus className="h-5 w-5 mr-1" />
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}