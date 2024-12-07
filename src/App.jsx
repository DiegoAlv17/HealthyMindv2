import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoleBasedRoute from "./components/RoledBasedRoute.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Professionals from "./pages/Professionals.jsx";
import Patients from "./pages/Patients.jsx";
import HealthCenter from "./pages/HealthCenter.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./scenes/admin-app.jsx";
import PacientesPage from "./pages/pacientes/PacientesPage.jsx";
import PacientesLayout from "./pages/pacientes/Layout.jsx";
import { CrearCita } from "./components/paciente/CrearCita.jsx";
import {Citas} from "./pages/pacientes/Citas.jsx";
import { Chats } from "./pages/pacientes/Chats.jsx";
import { Perfil } from "./pages/pacientes/Perfil.jsx";
import { PsicologoPerfil } from "./pages/pacientes/PsicologoPerfil.jsx";

import "./App.css";

import PsicologosPage from "./pages/PsicologosPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ConditionalNavbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/health-centers" element={<HealthCenter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas por rol */}
          <Route
            path="/pacientes"
            element={
              <RoleBasedRoute allowedRoles={["paciente"]}>
                <PacientesLayout/>
              </RoleBasedRoute>
            }
          >
          <Route index element={<PacientesPage />} />
          <Route path="citas" element={<Citas />} />  
          <Route path="chats" element={<Chats />} />  
          <Route path="perfil" element={<Perfil />} />
          <Route path="psicologo/:id" element={<PsicologoPerfil />} />
          <Route path="crear-cita/:psicologoId" element={<CrearCita/>}/>
          </Route>
          <Route
            path="/psicologos"
            element={
              <RoleBasedRoute allowedRoles={["psicologo"]}>
                <PsicologosPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </RoleBasedRoute>
            }
          />
        </Routes>
        <ConditionalFooter />
      </Router>
    </AuthProvider>
  );
}

function ConditionalNavbar() {
  const location = useLocation();

  // Lista de rutas protegidas
  const protectedRoutes = ["/pacientes", "/psicologos", "/admin"];

  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  return isProtectedRoute ? null : <Navbar/>;
}

function ConditionalFooter() {
  const location = useLocation();

  // Lista de rutas protegidas
  const protectedRoutes = ["/pacientes", "/psicologos", "/admin"];

  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  return isProtectedRoute ? null : <Footer/>;
}


export default App;
