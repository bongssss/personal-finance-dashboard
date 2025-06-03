import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { setAuthToken } from './lib/api'  // ✅ Import this

// 🔧 TEMP: Hardcode token for dev testing
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1Ym9uZ0B1Ym9uZy5jb20iLCJleHAiOjE3NDg5ODY3NDJ9.Hpx5_SjQ7GmR-RMRHIGvZFY5SdUMID_jSF8kG_bcvj4');

// ✅ Ensure axios attaches token to all future requests
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
