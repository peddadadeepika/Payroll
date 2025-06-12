import React from 'react'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'


const Empsidebar = ({ isSidebarOpen}) => {
    const {user} = useAuth()
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'mobile-active' : ''}`}> 
    <div className="sidebar-title"></div>
   <ul className="nav-links">
   <Link to="/employee-dashboard"><li>Dashboard</li></Link>
     <Link to={`/employee-dashboard/Profile/${user._id}`}><li>My Profile</li></Link>
     <Link to={`/employee-dashboard/leaves/${user._id}`}><li>Leaves</li></Link>
     <Link to={`/employee-dashboard/salary/${user._id}`}><li>Salary</li></Link>
     <Link to="/employee-dashboard/setting"><li>Setting</li></Link>
   </ul>
 </aside>
  )
} 

export default Empsidebar