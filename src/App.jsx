import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Professionals from "./pages/Professionals.jsx";
import Patients from "./pages/Patients.jsx";
import HealthCenters from "./pages/HealthCenter.jsx";
import Contact from "./pages/Contact.jsx";
import AuthPage from "./pages/auth.jsx";
import Adminapp from "./scenes/admin-app.jsx";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";

import "./App.css";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Verificar si estamos en la ruta del Adminapp
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Redirigir automáticamente a Adminapp si está autenticado al recargar
  useEffect(() => {
    if (isAuthenticated && !isAdminRoute) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAdminRoute, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/health-centers" element={<HealthCenters />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin/*" element={isAuthenticated ? <Adminapp /> : <Navigate to="/login" />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
