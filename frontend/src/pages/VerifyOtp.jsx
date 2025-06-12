// pages/VerifyOtp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState('');
  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp
      });

      if (res.data.success) {
        navigate("/reset-password");
      }    

    } catch (err) {
      setError(err.response?.data?.error || "Server Error");
    }
  };

  return (
    <div className="login-form">
      <div className="Login">
        <h2>Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>Enter OTP</label><br />
          <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} /><br />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
