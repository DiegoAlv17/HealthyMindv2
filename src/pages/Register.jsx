import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

const Register = () => {
    const [adminName, setAdminName] = useState('');
    const [adminEmail, setEmail] = useState('');
    const [adminPassword, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext); 

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                'http://localhost:3000/api/register',
                {
                    adminName,
                    adminEmail,
                    adminPassword,
                },
            );
    
            if (response.data.success) {
                alert('Usuario registrado exitosamente');
                login(response.data.token, response.data.adminName); 
                window.location.href = "/admin"; 
            } else {
                throw new Error(response.data.error || 'Error en la respuesta del servidor');
            }
        } catch (error) {
            setErrorMessage('Este usuario ya existe');
        }
    };
    
    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Nombre"
            />
            <input
                type="email"
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
            <button type="submit">Registrar</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default Register;