import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Calendar, Users, TrendingUp } from 'lucide-react';
import OrganizationSidebar from './OrganizationSidebar';

export default function OrganizationHome() {
  const [statsData, setStatsData] = useState({
    itemsCount: 0,
    eventsCount: 0,
    usersCount: 0,
    organizationsCount: 0,
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchStatsAndEvents = async () => {
      try {
        const organizerId = localStorage.getItem('orgid');

        const [eventsRes, itemsRes, usersRes, orgsRes] = await Promise.all([
          axios.get(`http://localhost:8000/events/organizer/${organizerId}`),
          axios.get(`http://localhost:8000/ourproduct/${organizerId}`),
          axios.get(`http://localhost:8000/viewallusers`),
          axios.get(`http://localhost:8000/viewallorganization`),
        ]);

        setEvents(eventsRes.data.data);
        
        setStatsData({
          eventsCount: eventsRes.data.data.length,
          itemsCount: itemsRes.data.data.length,
          usersCount: usersRes.data.length,
          organizationsCount: orgsRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats or events:", error);
      }
    };

    fetchStatsAndEvents();
  }, []);

  const stats = [
    { label: 'Listed Items', value: statsData.itemsCount, icon: Package },
    { label: 'Upcoming Events', value: statsData.eventsCount, icon: Calendar },
    { label: 'Users', value: statsData.usersCount, icon: Users },
    { label: 'Organizations', value: statsData.organizationsCount, icon: TrendingUp },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <OrganizationSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Events Table */}
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">All Organization Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Location</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map((event) => (
                  <tr key={event._id}>
                    <td className="px-4 py-2">{event.eventName}</td>
                    <td className="px-4 py-2">{new Date(event.eventDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{event.venue}</td>
                    <td className="px-4 py-2">{event.purpose}</td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
