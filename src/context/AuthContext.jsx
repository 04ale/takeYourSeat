import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicApi } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await publicApi.post('/api/auth/login', { email, password });
    const newToken = response.data.token;
    localStorage.setItem('jwt_token', newToken);
    setToken(newToken);
    navigate('/'); // Redireciona após o login
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    navigate('/login');
  };

  // Este useEffect garante que o estado do token seja sincronizado
  // se ele mudar em outra aba, por exemplo.
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('jwt_token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    token,
    isLoggedIn: !!token, // Uma forma fácil de saber se está logado
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};