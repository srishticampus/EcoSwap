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
import UserNavbar from './components/User/UserNav';
import OrganizationLogin from './components/organization/OrganizationLogin';
import OrganizationRegister from './components/organization/OrganizationRegister';
import ForgetPassword from './components/User/ForgetPassword';
import OrganaizationForgetPassword from "./components/organization/OrganaizationForgetPassword"
import UserHomePage from './components/User/UserHomePage';
import OrganisationAddProduct from './components/organization/OrganizationAddproduct';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<Navbar />, <Landing />, <Footer />]} />

        <Route path="/user/login" element={[<Navbar />, <Login />, <Footer />]} />
        <Route path="/user/register" element={[<Navbar />, <Register />, <Footer />]} />
        <Route path="/user/forgetpasword" element={[<Navbar />, <ForgetPassword />, <Footer />]} />
        <Route path="/user/home" element={[<UserNavbar />, <UserHome />, <Footer />]} />
        <Route path="/user/homepage" element={[<UserNavbar />, <UserHomePage />, <Footer />]} />
        <Route path="/user/profile" element={[<UserNavbar />, <Profile />, <Footer />]} />
        <Route path="/user/profileedit" element={[<UserNavbar />, <ProfileEdit />, <Footer />]} />
        <Route path="/user/products" element={[<UserNavbar />, <ProductList />, <Footer />]} />


        <Route path="/admin/login" element={[<Navbar />, <AdminLogin />, <Footer />]} />
        <Route path="/admin" element={[<AdminLayout />, <Footer />]}>
          <Route path='/admin/dashboard' element={[<AdminDashboard />, <Footer />]} />
          <Route path="/admin/swappers" element={[<AdminSwappersList />, <Footer />]} />
        </Route>

        <Route path='/organization/home' element={[<OrganizationHome />, <Footer />]} />
        <Route path='/organization/login' element={[<Navbar />, <OrganizationLogin />, <Footer />]} />
        <Route path='/organization/register' element={[<Navbar />, <OrganizationRegister />, <Footer />]} />
        <Route path="/organization/forgetpasword" element={[<Navbar />, <OrganaizationForgetPassword />, <Footer />]} />
        <Route path="/organization/addproduct" element={[<Navbar />, <OrganisationAddProduct />, <Footer />]} />


      </Routes>
    </Router>
  );
}

export default App;