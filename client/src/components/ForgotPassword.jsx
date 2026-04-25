import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
      Axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        email,
      }).then(response => {
          if(response.data.status) {
            alert("check you email for reset password link")
              navigate('/login')
          } else {
            setError(response.data.message);
          }
          
      }).catch(err => {
          setError("An error occurred. Please try again.");
          console.log(err)
      })
    };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        {error && <div className="error-msg">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Send Reset Link</button>
        <p><Link to="/login">Back to Login</Link></p>
      </form>
    </div>
  )
}

export default ForgotPassword