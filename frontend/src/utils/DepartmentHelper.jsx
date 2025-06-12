import React from "react";
import { useNavigate } from "react-router-dom";
import '../components/Dashboard/Admin.css'
import axios from "axios";


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "15%"
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        width: "30%"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
       width: "50%"
    },
]

export const DepartmentButtons = ({Id, onDepartmentDelete}) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete")
        if(confirm) {
        try {
            
            const responnse = await axios.delete(
                `http://localhost:5000/api/department/${id}`, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
            });
            if(responnse.data.success) {
                onDepartmentDelete()
            }
        }catch(error) {
            if(error.response && !error.response.data.success) {
                console.error("Failed to delete department:", error);
            }
           }
        }
    };

     const handleViewEmployees = () => {
        navigate(`/admin-dashboard/department/${Id}/employees`);
    }

    return (
        <div className="dep-buttons">
            <button style={{backgroundColor: '#05a771'}}
              onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >Edit</button>
            <button style={{backgroundColor: 'blue'}} onClick={handleViewEmployees}>View Employee</button>
              <button style={{backgroundColor: 'tomato'}}
            onClick={() => handleDelete(Id)}
            >Delete</button>
        </div>
    )
}