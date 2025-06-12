import React, { useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../Dashboard/Admin.css'


const View = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState(null)

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
                     setEmployee(responnse.data.employee)
                 }
             } catch(error) {
             if(error.response && !error.response.data.success) {
             }
            } 
            };
     
            fetchEmployee();
         }, [id]);
    return (
        <>{employee ? ( 
        <div className="view-emp">
            <div className="emp-details">
               <h2> Employee Details</h2>
            <div className="emp-flex">
            
            <div className="details">
                <div>
                    <p style={{fontWeight: "700"}}>Name:</p>&nbsp;&nbsp;
                    <p>{employee.userId.name}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Employee ID:</p>&nbsp;&nbsp;
                    <p>{employee.employeeId}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Date of Birth:</p>&nbsp;&nbsp;
                    <p>{new Date(employee.dob).toLocaleDateString()}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Gender:</p>&nbsp;&nbsp;
                    <p>{employee.gender}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Department:</p>&nbsp;&nbsp;
                    <p>{employee.department.dep_name}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Marital Status:</p>&nbsp;&nbsp;
                    <p>{employee.maritalStatus}</p>
                </div>
            </div>
            </div>

            </div>
        </div>
        ): <div> Loading...</div> }</>
    )
}

export default View