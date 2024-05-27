// auth.js (Servicio de autenticación)

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Credenciales incorrectas');
  }
};

const validateToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

const RegisterUserNew = async (name, email, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {name, email, password, role });
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error('Error al crear Usuario');
    }
  };

export { login, validateToken, RegisterUserNew };
