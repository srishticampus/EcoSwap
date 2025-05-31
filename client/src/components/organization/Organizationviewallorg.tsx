import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationSidebar from './OrganizationSidebar';

function Organizationviewallorg({ url }) {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${url}/viewallorganization`);
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [url]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OrganizationSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Organizations</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-green-100">
                <tr>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">City</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org._id} className="border-b hover:bg-gray-50">
                                      <td className="px-4 py-2 w-25"><img style={{width:"25px"}} src={`${url}/upload/${org.profilepic.filename}`}></img></td>

                  <td className="px-4 py-2">{org.organizationname}</td>
                  <td className="px-4 py-2">{org.email}</td>
                  <td className="px-4 py-2">{org.mobile}</td>
                  <td className="px-4 py-2">{org.city}</td>
                </tr>
              ))}
              {organizations.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Organizationviewallorg;
