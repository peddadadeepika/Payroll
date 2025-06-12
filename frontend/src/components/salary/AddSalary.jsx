import React, { useEffect, useState } from "react";
import '../Dashboard/Admin.css'
import axios from "axios";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import { useNavigate, useParams } from 'react-router-dom'

const AddSalary = () => {
    const [salary, setSalary] = useState({
        employeeId: "",
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()



    useEffect(() => {
            const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
            };
            getDepartments();
        }, []);

        const handleDepartment = async (e) => {
            const emps = await getEmployees(e.target.value)
            setEmployees(emps)
        };


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
                        setEmployees((prev) => ({...prev,
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
                };
               } 
               };
               fetchEmployee();
        }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
            setSalary((prevData) => ({...prevData, [name] : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `http://localhost:5000/api/salary/add`,
                 salary,{
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
        <>{departments  ? (
        <div className="salary-add">
            <div className="salary-form">
                <h2>Add Salary</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <div className="first">
                        <div>
                            <label>Department</label>
                            <select name="department" onChange={handleDepartment}  required>
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div><br />
                       
                        <div>
                            <label>Basic Salary</label>
                            <input type="number" name="basicSalary"  onChange={handleChange} placeholder="Basic Salary" required />
                        </div><br />
                        <div>
                            <label>Deductions</label>
                            <input type="number" name="deductions"  onChange={handleChange} placeholder="Deductions" required />
                        </div>
                        
                        
                        </div>
                   <div className="second">
                   <div>
                            <label>Employee</label>
                            <select name="employeeId" value={salary.employeeId} onChange={handleChange} required>
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div><br />
                        <div>
                            <label>Allowances</label>
                            <input type="number" name="allowances"  onChange={handleChange} placeholder="Allowances" required />
                        </div><br />
                        <div>
                            <label>Pay Date </label>
                            <input type="date" name="payDate"  onChange={handleChange} placeholder="Pay Date" required />
                        </div>
                        
                        </div>
                    </div><br />
     <div className="salary-btn">
                    <button type="submit">Add Salary</button>
                    </div>
                </form>
            </div>
        </div>
        ) : <div>Loading... </div> }</>
    )
}

export default AddSalary