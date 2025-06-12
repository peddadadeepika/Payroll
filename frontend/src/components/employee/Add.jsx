import React, { useEffect, useState } from "react";
import '../Dashboard/Admin.css'
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormdata] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === "image"){
            setFormdata((prevData) => ({...prevData, [name] : files[0]}))
        } else {
            setFormdata((prevData) => ({...prevData, [name] : value}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataobj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataobj.append(key, formData[key])
        })

        try {
            const response = await axios.post(`http://localhost:5000/api/employee/add`,
                 formDataobj,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                     "Content-Type": "application/json"
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
       
    }

    return (
        <div className="emp-add">
            <div className="emp-form">
                <h2>Add New Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <div className="first">
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleChange} placeholder="Insert Name" required />
                        </div><br />
                        
                        <div>
                            <label>Employee ID</label>
                            <input type="text" name="employeeId" onChange={handleChange} placeholder="Employee ID" required />
                        </div><br />
                        
                        <div>
                            <label>Gender</label>
                            <select name="gender" onChange={handleChange} required> 
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                </select>
                        </div><br />
                        
                        <div>
                            <label>Designation</label>
                            <input type="text" name="designation" onChange={handleChange} placeholder="Designation" required />
                        </div><br />

                        <div>
                            <label>Salary</label>
                            <input type="number" name="salary" onChange={handleChange} placeholder="Salary" required />
                        </div><br />

                        <div>
                            <label>Role</label>
                            <select name="role" onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div><br />
                        </div>
                   <div className="second">
                      <div>
                            <label>Email</label>
                            <input type="email" name="email" onChange={handleChange} placeholder="Insert Email" required/>
                        </div><br />
                        
                        <div>
                            <label>Date of Birth</label>
                            <input type="date" name="dob" onChange={handleChange} placeholder="DOB" required/>
                        </div><br />

                        <div>
                            <label>Marital Status</label>
                            <select name="maritalStatus" onChange={handleChange} placeholder="Marital Status" required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div><br />
                        <div>
                            <label>Department</label>
                            <select name="department" onChange={handleChange} required>
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div><br />
                        
                        <div>
                            <label>Password</label>
                            <input type="password" name="password"  placeholder="*******" onChange={handleChange} required/>
                        </div>
                        
                        
                        </div>
                    </div>
     <div className="btn">
                    <button type="submit">Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add