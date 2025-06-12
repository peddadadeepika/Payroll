import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "10%"
    },
    {
        name: "Emp-ID",
        selector: (row) => row.employeeId,
        width: "10%"

    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "15%"

    },
    {
        name: "Deaprtment",
        selector: (row) => row.dep_name,
        width: "15%"

    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width: "15%"

    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    },
]

export const fetchDepartments = async () => {
    let departments
    try {
        const responnse = await axios.get(
            'http://localhost:5000/api/department', {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
        });
        if(responnse.data.success) {
            departments = responnse.data.departments
        }
    } catch(error) {
    if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
    }
   } 
   return departments
   };

   //employees for salary form

   export const getEmployees = async (id) => {
    let employees
    try {
        const responnse = await axios.get(
            `http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
        });
        if(responnse.data.success) {
            employees = responnse.data.employees
        }
    } catch(error) {
    if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
    }
   } 
   return employees
   };

   export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate()

    
    return (
        <div className="emp-buttons">
            <button style={{backgroundColor: '#05a771'}}
              onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >View</button>

            <button style={{backgroundColor: 'blue'}}
            onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >Edit</button>

            <button style={{backgroundColor: 'orange'}}
            onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >Salary</button>

            <button style={{backgroundColor: 'tomato'}}
            onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >Leave</button>

        </div>
    )
}