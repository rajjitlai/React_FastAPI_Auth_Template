import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Dummy Login for Demo/Template purposes
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("demo_user", "true");
      navigate("/");
      return;
    }

    Axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      email,
      password,
    }).then(response => {
      if (response.data.status) {
        localStorage.removeItem("demo_user");
        navigate('/')
      } else {
        setError(response.data.message);
      }
    }).catch(err => {
      setError("Database offline. Use: admin@example.com / admin123");
      console.log(err)
    })
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-msg" style={{fontSize: '0.75rem'}}>{error}</div>}
        <p style={{fontSize: '0.7rem', marginTop: '-10px', marginBottom: '10px', color: 'rgba(255,255,255,0.3)'}}>
          Demo: admin@example.com / admin123
        </p>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign In</button>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '10px'}}>
          <Link to="/forgotPassword" style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)'}}>Forgot Password?</Link>
          <p style={{margin: 0}}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
