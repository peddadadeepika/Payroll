import React, { useState } from "react";
import Header from '../components/Dashboard/Header.jsx';
import EmpSidebar from "../components/EmployeeDashboard/EmpSidebar.jsx";
import { Outlet } from "react-router-dom"

const EmployeeDashboard = () => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(null);


    return(
        <div>
        <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}/>
        <div style={{display: "flex"}}>
        <EmpSidebar isSidebarOpen={isSidebarOpen} />
        <Outlet />
        </div>
      </div>
    )
}

export default EmployeeDashboard