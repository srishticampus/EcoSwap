import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="text-green-600 h-6 w-6 mr-2" />
              <span className="text-xl font-semibold text-green-800">EcoSwap</span>
            </div>
            <p className="text-green-700">
              Making sustainable living accessible through community exchange.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-green-700">
                <Mail className="h-5 w-5 mr-2" />
                contact@ecoswap.com
              </li>
              <li className="flex items-center text-green-700">
                <Phone className="h-5 w-5 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-green-700">
                <MapPin className="h-5 w-5 mr-2" />
                123 Green Street, Eco City
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-green-700 hover:text-green-900">About Us</a></li>
              <li><a href="/how-it-works" className="text-green-700 hover:text-green-900">How It Works</a></li>
              <li><a href="/terms" className="text-green-700 hover:text-green-900">Terms of Service</a></li>
              <li><a href="/privacy" className="text-green-700 hover:text-green-900">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Newsletter</h3>
            <p className="text-green-700 mb-4">Stay updated with our latest news and updates.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-green-200 text-center text-green-700">
          <p>&copy; {new Date().getFullYear()} EcoSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}