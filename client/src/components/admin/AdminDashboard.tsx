import React, { useEffect, useState } from 'react';
import { Users, Package, Building2, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/viewallusers');
        setUserCount(res.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchOrg = async () => {
      try {
        const res = await axios.get('http://localhost:8000/viewallorganization');
        setOrgCount(res.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    fetchOrg();
  }, []);

  const stats = [
    { label: 'Total Users', value: userCount, icon: Users, },
    { label: 'Active Items', value: '0', icon: Package, },
    { label: 'Organizations', value: orgCount, icon: Building2, },
    // { label: 'Monthly Swaps', value: '892', icon: TrendingUp,},
  ];

  // const chartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Item Swaps',
  //       data: [65, 78, 90, 85, 98, 110],
  //       borderColor: 'rgb(34, 197, 94)',
  //       tension: 0.3,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: 'Monthly Swap Activity',
  //     },
  //   },
  // };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-900 text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New User Registration</p>
                <p className="text-sm text-gray-600">John Doe joined the platform</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Successful Swap</p>
                <p className="text-sm text-gray-600">Eco Bottle exchanged for Plant Pot</p>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New Organization</p>
                <p className="text-sm text-gray-600">Green Earth Foundation joined</p>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}