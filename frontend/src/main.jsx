import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
    <App />
    <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
  </ThemeProvider>
  </StrictMode>
)
