import React, { useState } from 'react';
import axios from 'axios';
import OrganizationSidebar from './OrganizationSidebar';

function OrgAddEvents({ url }) {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    eventDate: '',
    eventTime: '',
    purpose: '',
    organizedBy: localStorage.getItem("orgid"),
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(`${url}/events`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setFormData({
        eventName: '',
        venue: '',
        eventDate: '',
        eventTime: '',
        purpose: '',
        organizedBy: localStorage.getItem("orgid"),
        image: null,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Event creation failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OrganizationSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Add New Event</h1>


        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Time</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Event Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

        {message && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit Event
          </button>
          
        </form>
      </main>
    </div>
  );
}

export default OrgAddEvents;
