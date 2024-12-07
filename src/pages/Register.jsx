import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
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
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="paciente">Paciente</option>
        <option value="psicologo">Psicólogo</option>
      </select>
      <button type="submit">Registrar</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default Register;
