import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileEdit({url}) {
  const userid = localStorage.getItem("userid"); // Replace this with logic to get user ID
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    profilepic: null,
    mobile: '',
    email: '',
    district: '',
    city: '',
    pincode: '',
    password: ''
  });

  // Fetch current user data to prefill form
  useEffect(() => {
    axios.get(`http://localhost:8000/viewuser/${userid}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Failed to load user data:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilepic') {
      setFormData({ ...formData, profilepic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.keys(formData).forEach(key => {
      updatedData.append(key, formData[key]);
    });

    try {
      const response = await axios.put(`http://localhost:8000/updateuser/${userid}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User updated:', response.data);
      navigate("/user/profile")
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Profile Picture Upload */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <div className="relative w-24 h-24 mb-3">
              <img
  src={
    formData?.profilepic instanceof File
      ? URL.createObjectURL(formData.profilepic)
      : formData.profilepic
        ? `${url}/upload/${formData.profilepic}`
        : '/default-user.png'
  }
  alt="Profile"
  className="h-24 w-24 rounded-full object-cover"
/>


                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer border border-gray-200">
                  <Camera className="h-5 w-5 text-gray-600" />
                  <input
                    type="file"
                    name="profilepic"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div> */}

            {/* Two inputs per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
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
    </div>
  );
}
