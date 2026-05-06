import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
