import React, { useState} from "react";
import "./Login.css"
import axios from "axios";
import { useAuth} from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handdleSubmit = async (e) => {
          e.preventDefault()
          try {
             const response = await axios.post(
                "http://localhost:5000/api/auth/login",  {email, password});
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                }else{
                    navigate("/employee-dashboard")
                }
            }
          }
          catch(error){
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
          }
    }

    return (
        <div className="login-form">
        <h2>Employee Management System</h2>

        <div className="Login">
            <div className="Login-form">
                <img src="/lomaa-logo.jpeg" alt="" width="30%"/>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handdleSubmit}>
                    <label htmlFor="email">Email</label><br/>
                    <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} required/><br/>
                    <div className="rem-for">
                    <label>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password">Forgot Password</Link></div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login