// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Optional: Automatically attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Correct way: define the setter *after* api is defined
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('✅ Token attached:', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
