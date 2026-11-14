import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Arthur Pendleton',
    email: 'admin@apexcorp.io',
    role: 'organization-admin',
    organizationId: 1,
    organizationName: 'Apex Corporate Technologies',
    organizationType: 'COMPANY',
  });
  const [token, setToken] = useState(localStorage.getItem('peoplesphere_token') || 'demo-token');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    // Scaffold for Phase 3 Authentication
    return true;
  };

  const logout = () => {
    localStorage.removeItem('peoplesphere_token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
