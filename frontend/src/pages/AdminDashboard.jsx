import React, { useState} from "react"
import { useAuth } from '../context/authContext.jsx'
import Sidebar from "../components/Dashboard/Sidebar.jsx"
import Header from "../components/Dashboard/Header.jsx"
import DashboardContent from "../components/Dashboard/DashboardContent.jsx"
import { Outlet } from "react-router-dom"

const AdminDashboard = () => {
 const {user, loading} = useAuth()
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const [isSideOpen, setIsSideOpen] = useState()

    return (
      <div>
        <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}/>
        <div style={{display: "flex"}}>
        <Sidebar isSidebarOpen={isSideOpen}/>
        <Outlet />
        </div>
      </div>
    )
}


export default AdminDashboard