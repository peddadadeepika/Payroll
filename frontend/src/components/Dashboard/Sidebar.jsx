// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Sidebar = ({ isSideOpen, setIsSideOpen }) => {
  const handleLinkClick = () => {
    if (window.innerWidth <= 767){
    setIsSideOpen();
    }
  };

  return (
    <aside className={`sidebar ${isSideOpen ? 'mobile-active' : ''}`}>
      <ul className="nav-links">
        <Link to="/admin-dashboard" onClick={handleLinkClick}><li>Dashboard</li></Link>
        <Link to="/admin-dashboard/employees" onClick={handleLinkClick}><li>Employee</li></Link>
        <Link to="/admin-dashboard/departments" onClick={handleLinkClick}><li>Departments</li></Link>
        <Link to="/admin-dashboard/leaves" onClick={handleLinkClick}><li>Leaves</li></Link>
        <Link to="/admin-dashboard/salary/add" onClick={handleLinkClick}><li>Salary</li></Link>
        <Link to="/admin-dashboard/setting" onClick={handleLinkClick}><li>Setting</li></Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
