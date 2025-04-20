import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/UserHome';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import ProductList from './pages/ProductList';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSwappersList from './pages/admin/AdminSwappersList';
import OrganizationHome from './pages/organization/OrganizationHome';
import AdminLayout from './layouts/AdminLayout';
import OrganizationLayout from './layouts/OrganizationLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Landing />
              </main>
              <Footer />
            </>
          }
        />

        {/* User Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<UserHome />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/edit" element={<ProfileEdit />} />
                  <Route path="/products" element={<ProductList />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="swappers" element={<AdminSwappersList />} />
        </Route>

        {/* Organization Routes */}
        <Route path="/organization" element={<OrganizationLayout />}>
          <Route index element={<OrganizationHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;