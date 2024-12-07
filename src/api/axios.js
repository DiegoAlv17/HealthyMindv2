// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Tu URL base del backend
  withCredentials: true, // Importante para manejo de cookies
});

export default instance;