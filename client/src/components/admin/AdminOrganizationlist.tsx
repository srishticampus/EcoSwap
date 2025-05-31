import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, MoreVertical, X } from 'lucide-react';

export default function AdminOrganizationsList({ url }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inactiveOrgs, setInactiveOrgs] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/viewallorganization`)
            .then((res) => setOrganizations(res.data))
            .catch((err) => console.error('Error fetching organizations:', err));
    }, [url]);

    const filteredOrgs = organizations.filter((org) =>
        org.organizationname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewRequests = () => {
        const inactiveList = organizations.filter((org) => !org.isactive);
        setInactiveOrgs(inactiveList);
        setShowModal(true);
    };

    const handleActivate = async (orgId) => {
        try {
            const formData = new FormData(); // required by backend middleware
            await axios.put(`${url}/toactivateorg/${orgId}`, formData);
            // Update UI
            setOrganizations((prev) =>
                prev.map((org) =>
                    org._id === orgId ? { ...org, isactive: true } : org
                )
            );
            setInactiveOrgs((prev) =>
                prev.filter((org) => org._id !== orgId)
            );
        } catch (error) {
            console.error("Error activating organization:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Organizations</h1>
                <button
                    onClick={handleViewRequests}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    New Requests
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search organizations..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Organizations Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrgs.length > 0 ? (
                            filteredOrgs.map((org) => (
                                <tr key={org._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <img
                                            src={
                                                org.profilepic?.filename
                                                    ? `${url}/upload/${org.profilepic.filename}`
                                                    : 'https://via.placeholder.com/50'
                                            }
                                            alt={`${org.organizationname}'s profile`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{org.organizationname}</div>
                                        <div className="text-sm text-gray-500">{org.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {org.city || 'N/A'}, {org.district || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${org.isactive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {org.isactive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-500">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No organizations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Inactive Requests */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Pending Organization Requests</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X />
                            </button>
                        </div>
                        {inactiveOrgs.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {inactiveOrgs.map((org) => (
                                        <tr key={org._id}>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900">{org.organizationname}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{org.email}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{org.city}, {org.district}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleActivate(org._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                                >
                                                    Activate
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No inactive organization requests found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
