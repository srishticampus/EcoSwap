import React, { useState, FormEvent, ChangeEvent } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Invalid email address';
      case 'password':
        return value.length >= 6
          ? ''
          : 'Password must be at least 6 characters';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/user/forgotpassword', formData);
      setMessage(response.data?.message || 'Password reset successful. Redirecting...');
      setTimeout(() => navigate('/user/login'), 2000); // Change the path as needed
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...err.response.data.errors,
        }));
      } else {
        setMessage(err.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LogIn className="mx-auto h-12 w-12 text-green-600" />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className="mb-4 text-center text-red-600">{message}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
