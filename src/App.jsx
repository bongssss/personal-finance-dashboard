//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SidebarLayout from './components/SidebarLayout'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Budget from './pages/Budget'

function App() {
 // const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* Redirect root to dashboard */}
      <Route path='/' element={<Navigate to={"/dashboard"}/>}/>
      {/* Layout wrapper */}
      <Route element={<SidebarLayout />}>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/budget' element={<Budget/>}/>
      <Route path='/goals' element={<Goals/>}/>
      </Route>
    
    </Routes>
  )
}

export default App
