import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('parikshaUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('parikshaToken') || null;
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('parikshaUser', JSON.stringify(user));
      localStorage.setItem('parikshaToken', token);
    } else {
      localStorage.removeItem('parikshaUser');
      localStorage.removeItem('parikshaToken');
    }
  }, [user, token]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
