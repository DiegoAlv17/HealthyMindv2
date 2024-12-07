import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("paciente");
  const [errorMessage, setErrorMessage] = useState("");
  const { register, login } = useContext(AuthContext); // Accedemos a 'register' y 'login'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const user = await register({ name, email, password, role }); // Llama a register del AuthContext

      if (user) {
        await login(email, password); // Inicia sesión automáticamente después de registrarse
        // Redirige según el rol del usuario
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "psicologo") {
          navigate("/psicologos");
        } else if (user.role === "paciente") {
          navigate("/pacientes");
        }
      }
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar el usuario.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Registro</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="paciente">Paciente</option>
              <option value="psicologo">Psicólogo</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Registrar
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
