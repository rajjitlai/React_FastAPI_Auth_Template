import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const isDemo = localStorage.getItem("demo_user") === "true";
        if (isDemo) return; // Allow access in demo mode

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`)
        .then(res=> {
            if(res.data.status) {

            } else {
                navigate('/')
            }
            console.log(res)
        }).catch(() => {
            navigate('/')
        })
    }, [])
  const dummyUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", initial: "A" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", initial: "B" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", initial: "C" },
  ];

  return (
    <div className="sign-up-container">
      <div className="sign-up-form" style={{maxWidth: '600px'}}>
        <h2>Dashboard</h2>
        <div style={{color: 'rgba(255,255,255,0.7)', lineHeight: '1.6'}}>
          <p>This is a protected dashboard area. Only authorized users can see this content.</p>
          <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px'}}>
            <h4 style={{margin: '0 0 10px 0', color: '#fff'}}>User Session Info</h4>
            <p style={{margin: 0, fontSize: '0.85rem'}}>
              Authenticated via Secure HTTP-Only JWT Cookie<br/>
              Backend: FastAPI (Python)<br/>
              Database: SQLite
            </p>
          </div>

          <div className="dummy-data-section">
            <h4 style={{margin: '0 0 15px 0', color: '#fff', fontSize: '1rem'}}>Recent Users (Sample Data)</h4>
            {dummyUsers.map(user => (
              <div key={user.id} className="user-card">
                <div className="avatar">{user.initial}</div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{color: '#fff', fontSize: '0.9rem', fontWeight: 600}}>{user.name}</span>
                  <span style={{color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem'}}>{user.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  )
}

export default Dashboard