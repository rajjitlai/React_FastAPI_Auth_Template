import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const isDemo = localStorage.getItem("demo_user") === "true";
    if (isDemo) return;

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`)
    .then(res => {
      if(!res.data.status) {
        navigate('/login')
      }
    }).catch(err => {
      navigate('/login')
      console.log(err)
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("demo_user");
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`)
    .then(res => {
      if(res.data.status) {
        navigate('/login')
      }
    }).catch(err => {
      // Even if server is offline, we clear local demo state and redirect
      navigate('/login')
      console.log(err)
    })
  }
  return (
    <div className="home-container">
      <div className="sign-up-form">
        <h2>Welcome Home</h2>
        <p>You are successfully logged in to the FastAPI + React Auth Template.</p>
        <button><Link to="/dashboard" style={{color: 'inherit'}}>Go to Dashboard</Link></button>
        <button 
          onClick={handleLogout}
          style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff'}}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home