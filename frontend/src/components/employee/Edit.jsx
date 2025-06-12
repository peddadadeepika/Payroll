import React, { useEffect, useState } from "react";
import '../Dashboard/Admin.css'
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: '',
        department: '',
    });
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
            const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
            };
            getDepartments();
        }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const responnse = await axios.get(
                    `http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if(responnse.data.success) {
                    const employee = responnse.data.employee
                    setEmployee((prev) => ({...prev,
                         name: employee.userId.name,
                         maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department,
                        role: employee.role
                        }));
                }
            } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.responnse.data.error)
            }
           } 
           };
           fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
            setEmployee((prevData) => ({...prevData, [name] : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                 employee,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
       
    };

    return (
        <>{departments && employee ? (
        <div className="emp-add">
            <div className="emp-form">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <div className="first">
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Insert Name" required />
                        </div>  <br />                      
                        <div>
                            <label>Designation</label>
                            <input type="text" name="designation" value={employee.designation} onChange={handleChange} placeholder="Designation" required />
                        </div><br />
                        <div>
                            <label>Salary</label>
                            <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" required />
                        </div>
                        
                        </div>
                   <div className="second">
                        <div>
                            <label>Marital Status</label>
                            <select name="maritalStatus" onChange={handleChange} value={employee.maritalStatus} placeholder="Marital Status" required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div><br />
                        <div>
                            <label>Department</label>
                            <select name="department" onChange={handleChange} value={employee.department} required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div><br />
                        
                        </div>
                    </div><br />
     <div className="edit-btn">
                    <button type="submit">Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
        ) : <div>Loading... </div> }</>
    )
}

export default Edit