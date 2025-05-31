import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrganizationSidebar from './OrganizationSidebar';

export default function OrganizationProfileEdit({ url }) {
  const userid = localStorage.getItem("orgid");
  const [formData, setFormData] = useState({
    organizationname: '',
    email: '',
    profilepic: '',
    mobile: '',
    password: '',
    confirmPass: '',
    district: '',
    city: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/vieworganization/${userid}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Failed to load organization data:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilepic') {
      setFormData({ ...formData, profilepic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.keys(formData).forEach(key => {
      updatedData.append(key, formData[key]);
    });
    console.log(updatedData, "updateddata");

    try {
      const response = await axios.put(
        `http://localhost:8000/updateorganization/${userid}`,
        updatedData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Organization updated:', response.data);
      navigate("/organization/profile");
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <OrganizationSidebar />
      </div>
      <div className="min-h-screen bg-gray">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Organization Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <div className="relative w-24 h-24 mb-3">
                  <img
                    src={
                      formData?.profilepic instanceof File
                        ? URL.createObjectURL(formData.profilepic.filename)
                        : formData.profilepic
                          ? `${url}/upload/${formData.profilepic.filename}`
                          : '/default-user.png'
                    }
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover"
                  />

              
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                name="organizationname"
                value={formData.organizationname}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>




          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Update Profile
            </button>
          </div>

        </form>
      </div>
    </div>
      </div >
    </div >
  );
}
