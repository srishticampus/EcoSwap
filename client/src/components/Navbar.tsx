import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, LogIn, UserPlus, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);

  return (
    <nav className="bg-green-50 fixed w-full z-20 top-0 left-0 border-b border-green-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <Leaf className="text-green-600 h-8 w-8 mr-2" />
          <span className="self-center text-2xl font-semibold text-green-800">EcoSwap</span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-green-700 rounded-lg hover:bg-green-100"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menu items */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">

            {/* Login dropdown */}
            <li className="relative">
              <button
                onClick={() => {
                  setLoginOpen(!loginOpen);
                  setRegOpen(false);
                }}
                className="flex items-center py-2 pl-3 pr-4 text-green-700 hover:text-green-900 focus:outline-none"
              >
                <LogIn className="h-5 w-5 mr-1" />
                Login
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {loginOpen && (
                <ul className="absolute bg-white border border-green-200 rounded-md mt-1 py-2 w-40 shadow-lg">
                  <li>
                    <Link
                      to="/user/login"
                      className="block px-4 py-2 hover:bg-green-50 text-green-700"
                    >
                      User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/organization/login"
                      className="block px-4 py-2 hover:bg-green-50 text-green-700"
                    >
                      Organization
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/login"
                      className="block px-4 py-2 hover:bg-green-50 text-green-700"
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Register dropdown */}
            <li className="relative">
              <button
                onClick={() => {
                  setRegOpen(!regOpen);
                  setLoginOpen(false);
                }}
                className="flex items-center py-2 pl-3 pr-4 text-green-700 hover:text-green-900 focus:outline-none"
              >
                <UserPlus className="h-5 w-5 mr-1" />
                Register
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {regOpen && (
                <ul className="absolute bg-white border border-green-200 rounded-md mt-1 py-2 w-40 shadow-lg">
                  <li>
                    <Link
                      to="/user/register"
                      className="block px-4 py-2 hover:bg-green-50 text-green-700"
                    >
                      User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/organization/register"
                      className="block px-4 py-2 hover:bg-green-50 text-green-700"
                    >
                      Organization
                    </Link>
                  </li>
                </ul>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
