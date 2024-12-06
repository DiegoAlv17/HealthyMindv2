import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const AuthPage = () => {
    const [showRegister, setShowRegister] = useState(false);

    const toggleForm = () => {
        setShowRegister(!showRegister);
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h1>{showRegister ? "Registro de Usuario" : "Iniciar Sesión"}</h1>
                {showRegister ? <Register /> : <Login />}
                <p>
                    {showRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
                    <button className="toggle-button" onClick={toggleForm}>
                        {showRegister ? "Inicia Sesión aquí" : "Regístrate aquí"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
