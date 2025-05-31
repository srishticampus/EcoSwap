import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminViewallproducts({url}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/product/all')
        if (res.data.success) {
          setProducts(res.data.data)
        } else {
          setError('Failed to fetch products')
        }
      } catch (err) {
        console.error(err)
        setError('Something went wrong while fetching products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        All Products
      </h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-600">No products available.</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={`${url}/upload/${product.image?.filename}`}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>

              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-green-700 font-medium">₹ {product.price}</span>
                <span className="text-gray-500">Qty: {product.productquantity}</span>
              </div>

              <div className="text-sm text-gray-600 mb-1">
                Code: {product.productcode}
              </div>

              <div className="text-sm mb-1">
                Category: <span className="font-medium">{product.category}</span>
              </div>

              <div className="text-sm">
                Status:{' '}
                <span className={product.isAvailable ? 'text-green-600' : 'text-red-600'}>
                  {product.isAvailable ? 'Available' : 'Not Available'}
                </span>
              </div>

              <div className="text-sm mt-1">
                Swap Available:{' '}
                <span className={product.swapAvailable ? 'text-green-700' : 'text-red-500'}>
                  {product.swapAvailable ? 'Yes' : 'No'}
                </span>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Added by: {product.addedBy?.fullname || product.addedBy?.organizationname} ({product.addedByType})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminViewallproducts
