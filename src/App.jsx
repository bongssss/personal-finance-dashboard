//import { useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SidebarLayout from './components/SidebarLayout'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Budget from './pages/Budget'

//import Login from './components/Login' // ⬅ Add this import
//<Route path="/login" element={<Login />} /> {/*  Add login route */}

function App() {
  //const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      

      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/budget" element={ <Budget /> } />
        <Route path="/goals" element={ <Goals /> } />
      </Route>
    </Routes>
  );
}


export default App
