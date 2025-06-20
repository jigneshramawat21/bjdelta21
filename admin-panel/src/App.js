import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HomeManage from './pages/HomeManage';
import AboutManage from './pages/AboutManage';
import ServiceManage from './pages/ServiceManage';
import ContactManage from './pages/ContactManage';
import EnrollManage from './pages/EnrollManage';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("admin-auth") === "true"
  );

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          
          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated}><HomeManage /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute isAuthenticated={isAuthenticated}><AboutManage /></PrivateRoute>} />
          <Route path="/services" element={<PrivateRoute isAuthenticated={isAuthenticated}><ServiceManage /></PrivateRoute>} />
          <Route path="/admin/contact" element={<PrivateRoute isAuthenticated={isAuthenticated}><ContactManage /></PrivateRoute>} />
          <Route path="/admin/enroll" element={<PrivateRoute isAuthenticated={isAuthenticated}><EnrollManage /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
