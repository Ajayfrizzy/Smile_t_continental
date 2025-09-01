import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';
import Social from './pages/Social';

// Auth Pages
import Login from './pages/auth/Login';

// Dashboard Pages
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Navbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/social" element={<Social />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/superadmin" 
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Placeholder routes for other dashboards */}
            <Route 
              path="/supervisor" 
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'supervisor']}>
                  <div className="min-h-screen pt-16 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h1>
                      <p className="text-gray-600 mt-4">Coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/receptionist" 
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'receptionist']}>
                  <div className="min-h-screen pt-16 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900">Receptionist Dashboard</h1>
                      <p className="text-gray-600 mt-4">Coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/barman" 
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'barman']}>
                  <div className="min-h-screen pt-16 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900">Barman Dashboard</h1>
                      <p className="text-gray-600 mt-4">Coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;