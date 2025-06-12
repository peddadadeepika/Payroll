import React from 'react'
import { useAuth } from "../../context/authContext"
import './Admin.css'

const Header = ({ isSidebarOpen, setIsSidebarOpen}) => {
  const { user, logout } = useAuth()

  return (
    <header className="dashboard-header">
       <div className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </div>
      <div className="title">Employee MS</div>
      <div className="header-right">
        <span className="welcome-text">Welcome { user.name}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  )
}

export default Header
