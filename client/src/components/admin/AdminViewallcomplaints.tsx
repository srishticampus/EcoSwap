import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminViewallcomplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:8000/allComplaints')
        if (res.data.success) {
          setComplaints(res.data.data)
        } else {
          setError('Failed to fetch complaints')
        }
      } catch (err) {
        console.error(err)
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        All User Complaints
      </h2>

      {loading && <p className="text-center text-gray-600">Loading complaints...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && complaints.length === 0 && (
        <p className="text-center text-gray-500">No complaints found.</p>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Complaint by: {complaint.userId?.fullname || 'Unknown User'}
            </h3>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Message:</span> {complaint.complaintMessage}
            </p>

    

            <p className="text-sm text-gray-500">
              <span className="font-semibold">Date:</span>{' '}
              {new Date(complaint.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminViewallcomplaints
