// pages/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password",
         { email });
      if (response.data.success) {

        setMessage("OTP sent to your email");
        localStorage.setItem("resetEmail", email); // store for next step
        navigate("/verify-otp");
      }

    } catch (err) {
      setError(err.response?.data?.error || "Server Error");
    }
  };

  return (
    <div className="login-form">
      <div className="Login">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          <label>Email</label><br />
          <input type="email" required onChange={(e) => setEmail(e.target.value)} /><br />
          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
