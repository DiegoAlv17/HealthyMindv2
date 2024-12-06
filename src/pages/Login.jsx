// HealthyMind/src/components/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [adminEmail, setEmail] = useState("");
    const [adminPassword, setPassword] = useState("");
    const navigate = useNavigate(); // Usa useNavigate
    const { login } = useContext(AuthContext); // Usa el contexto de autenticación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/login", { adminEmail, adminPassword });
            if (response.data.success) {
                login(response.data.token, response.data.adminName); 
                navigate("/admin"); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={adminEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={adminPassword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;