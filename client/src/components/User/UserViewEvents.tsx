import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserNavbar from './UserNav'

function UserViewEvents({url}) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8000/events/upcoming')
        if (res.data.success == true) {
          setEvents(res.data.data)
        } else {
          setError('Failed to fetch events.')
        }
      } catch (err) {
        console.error(err)
        setError('An error occurred while fetching events.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
        <UserNavbar/>
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Upcoming Events
      </h2>

      {loading && <p className="text-center text-gray-500">Loading events...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {events.length === 0 && !loading && (
        <p className="text-center text-gray-600">No upcoming events found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition"
          >
            <img src={`${url}/upload/${event.image.filename}`}></img>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{event.eventName}</h3>
            <p className="text-gray-600 text-sm mb-2">
              📍 {event.venue}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              🗓️ {new Date(event.eventDate).toLocaleDateString()} | 🕒{' '}
           {event.eventTime}
            </p>
            <p className="text-gray-700 text-sm">{event.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserViewEvents
