import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);

            // Redirige según el rol del usuario
            if (user?.role === "admin") {
                navigate("/admin");
            } else if (user?.role === "psicologo") {
                navigate("/psicologos");
            } else if (user?.role === "paciente") {
                navigate("/pacientes");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Iniciar Sesión</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600 transition duration-300"
                >
                    Iniciar Sesión
                </button>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">¿No tienes una cuenta? </span>
                    <Link to="/register" className="text-pink-600 hover:underline">
                        Regístrate
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
