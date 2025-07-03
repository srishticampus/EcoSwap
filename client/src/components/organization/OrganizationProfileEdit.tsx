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
    district: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/vieworganization/${userid}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Failed to load organization data:', err));
  }, [userid]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilepic') {
      setFormData({ ...formData, profilepic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.organizationname) newErrors.organizationname = "Organization name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be exactly 10 digits";
    }
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });

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

  const getProfilePicUrl = () => {
    if (formData.profilepic instanceof File) {
      return URL.createObjectURL(formData.profilepic);
    }
    return formData.profilepic ? `${url}/upload/${formData.profilepic}` : '/default-user.png';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <OrganizationSidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Organization Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
          

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
                {errors.organizationname && <p className="text-red-500 text-sm">{errors.organizationname}</p>}
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
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
                {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
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
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
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
    </div>
  );
}
