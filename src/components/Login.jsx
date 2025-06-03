import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';  // or wherever your Dashboard lives
import { setAuthToken } from './lib/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  if (!token) {
    return <Login onLogin={(newToken) => setToken(newToken)} />;
  }

  return <Dashboard />;
}
