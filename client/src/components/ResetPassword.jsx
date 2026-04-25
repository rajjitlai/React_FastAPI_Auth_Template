import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {token} = useParams()
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
      Axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`, {
        password,
      }).then(response => {
          if(response.data.status) {
              navigate('/login')
          } else {
            setError(response.data.message);
          }
          console.log(response.data)
      }).catch(err => {
          setError("Invalid or expired token.");
          console.log(err)
      })
    };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        {error && <div className="error-msg">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Update Password</button>
      </form>
    </div>
  )
}

export default ResetPassword