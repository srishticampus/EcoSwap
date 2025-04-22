import React, { useState, FormEvent, ChangeEvent } from 'react';
import image from "../../asserts/image 1.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormState = {
  fullname: string;
  gender: string;
  profilepic: File | null;
  mobile: string;
  email: string;
  password: string;
  confirmpassword: string;
  district: string;
  city: string;
  pincode: string;
};

type ErrorState = {
  [K in keyof FormState]?: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    fullname: '',
    gender: '',
    profilepic: null,
    mobile: '',
    email: '',
    password: '',
    confirmpassword: '',
    district: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const validateField = (name: keyof FormState, value: any): string => {
    switch (name) {
      case 'fullname':
      case 'gender':
      case 'district':
      case 'city':
        return value.trim() === '' ? 'This field is required' : '';

      case 'profilepic':
        return value instanceof File ? '' : 'Profile picture is required';

      case 'mobile':
        return /^\d{10}$/.test(value)
          ? ''
          : 'Mobile number must be exactly 10 digits';

      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Invalid email address';

      case 'pincode':
        return /^\d{6}$/.test(value)
          ? ''
          : 'Pincode must be exactly 6 digits';

      case 'password':
        return value.length >= 6
          ? ''
          : 'Password must be at least 6 characters';

      case 'confirmpassword':
        return value === form.password
          ? ''
          : 'Passwords do not match';

      default:
        return '';
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;
    const val = type === 'file' ? files?.[0] ?? null : value;
    setForm((f) => ({ ...f, [name]: val }));

    // Validate immediately
    setErrors((err) => ({
      ...err,
      [name]: validateField(name as keyof FormState, val),
    }));
  };

  const isFormValid = (): boolean => {
    // Ensure no error messages and no empty required
    for (const key of Object.keys(form) as (keyof FormState)[]) {
      const val = form[key];
      const err = validateField(key, val);
      if (err) return false;
    }
    return true;
  };
const navigate=useNavigate()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: ErrorState = {};
    (Object.keys(form) as (keyof FormState)[]).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);

    if (!isFormValid()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any);
    });

    try {
      const response = await axios.post('http://localhost:8000/user/register', formData)
      console.log(response,"res");
      
      if (response.data.success == true) {
        alert("Register Successfully")
        navigate("/user/login")
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
  return (
    <div className="bg-[#f7fefb] min-h-screen">
      <header className="bg-[#c9f7d1]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#2f7a2f] font-medium text-base">
            <i className="fas fa-leaf" />
            <span>EcoSwap</span>
          </div>
          <ul className="flex items-center space-x-6 text-[#2f7a2f] text-sm font-normal">
            <li><a className="hover:underline" href="#">Products</a></li>
            <li>
              <a className="flex items-center space-x-1 hover:underline" href="#">
                <span>Login</span>
                <i className="fas fa-arrow-right ml-1" />
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-1 hover:underline" href="#">
                <i className="fas fa-user-plus" />
                <span>Register</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start gap-12">
        <div className="flex-shrink-0 max-w-[480px] w-full">
          <img
            alt="Illustration"
            className="w-full h-auto"
            height={480}
            src={image}
            width={480}
          />
        </div>

        <form
          aria-label="Register form"
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 rounded-lg p-8 w-full max-w-lg"
        >
          <h1 className="text-2xl font-semibold mb-8">Register</h1>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm mb-1">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={form.fullname}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>

          {/* Gender */}
          <fieldset className="mb-4">
            <legend className="text-sm mb-1">Gender</legend>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
            )}
          </fieldset>

          {/* Profile Picture */}
          <div className="mb-4">
            <label htmlFor="profilepic" className="block text-sm mb-1">
              Profile Picture
            </label>
            <input
              id="profilepic"
              name="profilepic"
              type="file"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            />
            {errors.profilepic && (
              <p className="text-red-600 text-sm mt-1">{errors.profilepic}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm mb-1">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.mobile && (
                <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* District */}
            <div>
              <label htmlFor="district" className="block text-sm mb-1">
                District
              </label>
              <input
                id="district"
                name="district"
                type="text"
                value={form.district}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.district && (
                <p className="text-red-600 text-sm mt-1">{errors.district}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm mb-1">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm mb-1">
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.pincode && (
                <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmpassword" className="block text-sm mb-1">
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                value={form.confirmpassword}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.confirmpassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmpassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${isFormValid()
                ? 'bg-[#2f7a2f] hover:bg-green-800'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
