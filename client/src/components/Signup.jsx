import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    Axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
      username,
      email,
      password,
    }).then(response => {
        if(response.data.status) {
            navigate('/login')
        } else {
            setError(response.data.message);
        }
    }).catch(err => {
        setError("An error occurred during registration.");
        console.log(err)
    })
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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

        <button type="submit">Create Account</button>
        <p>Already have an account? <Link to="/login">Login</Link></p> 
      </form>
    </div>
  );
};

export default Signup;
