import React from 'react';
import { Package, Calendar, Users, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import OrganizationSidebar from './OrganizationSidebar';

export default function OrganizationHome() {
  const stats = [
    { label: 'Listed Items', value: '156', icon: Package, change: '+12%' },
    { label: 'Upcoming Events', value: '3', icon: Calendar, change: 'New' },
    { label: 'Community Members', value: '1,234', icon: Users, change: '+5%' },
    { label: 'Impact Score', value: '892', icon: TrendingUp, change: '+18%' },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Items Distributed',
        data: [45, 58, 65, 60, 75, 85],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Distribution Activity',
      },
    },
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Swap Meet',
      date: '2024-03-15',
      location: 'Central Park',
      participants: 45,
    },
    {
      id: 2,
      title: 'Electronics Recycling Drive',
      date: '2024-03-20',
      location: 'Community Center',
      participants: 30,
    },
    {
      id: 3,
      title: 'Sustainable Living Workshop',
      date: '2024-03-25',
      location: 'Green Space Hub',
      participants: 25,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <OrganizationSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* <h1 className="text-3xl font-bold mb-8 text-green-800">Organization Dashboard</h1> */}

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
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Chart and Events Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          {/* <div className="bg-white p-6 rounded-xl shadow">
            <Line data={chartData} options={chartOptions} />
          </div> */}

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-b pb-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="text-sm text-gray-400">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{event.participants} Participants</p>
                      <button className="text-sm text-green-600 hover:underline">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-green-700 hover:text-green-800">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
