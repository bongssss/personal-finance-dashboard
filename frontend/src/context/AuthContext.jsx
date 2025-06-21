import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, fetchMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      fetchMe(token).then(setUser).catch(() => {
        setToken('');
        localStorage.removeItem('token');
      });
    }
  }, [token]);

  const login = async (email, password) => {
    const { access_token } = await loginUser(email, password);
    setToken(access_token);
    localStorage.setItem('token', access_token);
    const me = await fetchMe(access_token);
    setUser(me);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
