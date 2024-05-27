// useAuth.js (Hook personalizado)

import { useState } from 'react';
import { login, validateToken, RegisterUserNew } from '../services/auth';

const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  const [error, setError] = useState(null);

  const loginHandler = async (email, password) => {
    try {
      setError(null);
      const { token, user } = await login(email, password);
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return token;
    } catch (error) {
      setError(error.message);
    }
  };

  const validateTokenHandler = async (token) => {
    try {
      setError(null);
      const user = await validateToken(token);
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      setError(error.message);
    }
  };

  const registerHandler = async (name, email, password) => {
    try {
      setError(null);
      const response = await RegisterUserNew(name, email, password, 'user');
      console.log(response);
      if (response) {
        const { token, user } = response;
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return response;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { user, error, login: loginHandler, validateToken: validateTokenHandler, registerUser: registerHandler };
};

export default useAuth;
