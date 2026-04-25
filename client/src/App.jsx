import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Dashboard from './components/Dashboard'

function App() {
  const [dbConnected, setDbConnected] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/`)
        if (response.status === 200) setDbConnected(true)
      } catch (err) {
        setDbConnected(false)
      }
    }
    checkConnection()
    const interval = setInterval(checkConnection, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <BrowserRouter>
      <div className="template-ribbon">Template</div>
      <div className="connection-status">
        <div className={`status-dot ${dbConnected ? 'status-online' : 'status-offline'}`}></div>
        {dbConnected ? 'Database Connected' : 'Database Offline'}
      </div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path = "/signup" element={<Signup />}></Route>
        <Route path = "/login" element={<Login />}></Route>
        <Route path = "/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path = "/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
      <a 
        href="https://github.com/rajjitlai/React_FastAPI_Auth_Template" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          zIndex: 1000
        }}
      >
        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        GitHub Repo
      </a>
    </BrowserRouter>
  )
}

export default App
