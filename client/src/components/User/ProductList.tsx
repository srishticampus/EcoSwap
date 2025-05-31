import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowUpDown, Heart } from 'lucide-react';
import axios from 'axios';

export default function ProductList({ url }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: '',
    expiryDate: '',
    cvv: '',
    payAmount: ''
  });
  const [likedProducts, setLikedProducts] = useState([]);

  const fetchdata = () => {
    axios.get('http://localhost:8000/product/all')
      .then((res) => {
        if (res.data.success) {
          const orgProducts = res.data.data.filter(
            product => product.addedByType === 'organizations' && product.isAvailable === true
          );
          setProducts(orgProducts);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const openPaymentModal = (productId, price) => {
    setSelectedProductId(productId);
    setPaymentDetails(prev => ({ ...prev, payAmount: price }));
    setShowModal(true);
  };

  const closePaymentModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
    setPaymentDetails({
      accountNumber: '',
      expiryDate: '',
      cvv: '',
      payAmount: ''
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLikeProduct = async (productId) => {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      alert("Please login to add to wishlist.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/wishlist/add', {
        productId,
        userId
      });

      if (res.data.success) {
        setLikedProducts(prev => [...prev, productId]);
        alert(res.data.message);  // "Product added to wishlist"
      } else {
        alert(res.data.message);  // "Already in wishlist"
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist.");
    }
  };

  const handlePaymentAndBuy = async () => {
    const { accountNumber, cvv, expiryDate } = paymentDetails;

    if (accountNumber.length !== 16) {
      alert("Account number must be exactly 16 digits.");
      return;
    }

    if (cvv.length !== 3) {
      alert("CVV must be exactly 3 digits.");
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      alert("Expiry date must be a future date.");
      return;
    }

    const buyerId = localStorage.getItem('userid');
    if (!buyerId) {
      alert("Please login to buy a product.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/buyProduct', {
        productId: selectedProductId,
        buyerId
      });

      if (response.data.success) {
        fetchdata();
        alert('Product purchased successfully!');
        closePaymentModal();
      } else {
        alert('Purchase failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error buying product:', error);
      alert('Error occurred while processing purchase.');
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ArrowUpDown className="h-5 w-5 mr-2" />
                Sort
              </button>
            </div> */}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden relative">
              <img
                src={`${url}/upload/${product.image?.filename}`}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleLikeProduct(product._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Add to Wishlist"
              >
                <Heart fill={likedProducts.includes(product._id) ? 'red' : 'none'} />
              </button>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-sm text-gray-800 mb-2 font-medium">Price: ₹{product.price}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{product.addedBy?.organizationname || 'Organization'}</p>
                  </div>
                  <button
                    onClick={() => openPaymentModal(product._id, product.price)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Payment Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number (16 digits)"
                value={paymentDetails.accountNumber}
                onChange={handlePaymentChange}
                className={`w-full px-4 py-2 border rounded-md ${
                  paymentDetails.accountNumber.length !== 16 ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={16}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV (3 digits)"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                className={`w-full px-4 py-2 border rounded-md ${
                  paymentDetails.cvv.length !== 3 ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={3}
              />
              <input
                type="date"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentChange}
                className={`w-full px-4 py-2 border rounded-md ${
                  new Date(paymentDetails.expiryDate) <= new Date() ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <input
                type="text"
                name="payAmount"
                placeholder="Amount"
                value={paymentDetails.payAmount}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closePaymentModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentAndBuy}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
