import React, { useState, useEffect}from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Dashboard/Admin.css'


const Detail = () => {
    const {id} = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
            const fetchLeave = async () => {
             try {
                 const responnse = await axios.get(
                     `http://localhost:5000/api/leave/detail/${id}`, {
                     headers: {
                         Authorization : `Bearer ${localStorage.getItem('token')}`,
                     },
                 }
                );
                 if(responnse.data.success) {
                     setLeave(responnse.data.leave)
                 }
             } catch(error) {
             if(error.response && !error.response.data.success) {
                alert(error.response.data.erroe);
             }
            } 
            };
     
            fetchLeave();
         }, []);

         const changeStatus = async (id, status) => {
            try {
                const responnse = await axios.put(
                    `http://localhost:5000/api/leave/${id}`, {status}, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`,
                    },
                }
               );
                if (responnse.data.success) {
                   navigate('/admin-dashboard/leaves')
                }
            } catch(error) {
            if(error.response && !error.response.data.success) {
               alert(error.response.data.erroe);
            }
           } 

         }

    return (
        <>
        {leave ? ( 
        <div className="view-emp">
            <div className="emp-details">
               <h2> Leave Details</h2>
            <div className="emp-flex">
            
            <div className="details">
                <div>
                    <p style={{fontWeight: "700"}}>Name:</p>&nbsp;&nbsp;
                    <p>{leave.employeeId.userId.name}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Employee ID:</p>&nbsp;&nbsp;
                    <p>{leave.employeeId.employeeId}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Leave Type:</p>&nbsp;&nbsp;
                    <p>{leave.leaveType}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Reason:</p>&nbsp;&nbsp;
                    <p>{leave.reason}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Department:</p>&nbsp;&nbsp;
                    <p>{leave.employeeId.department.dep_name}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>Start Date:</p>&nbsp;&nbsp;
                    <p>{new Date(leave.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>End Date:</p>&nbsp;&nbsp;
                    <p>{new Date(leave.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                    <p style={{fontWeight: "700"}}>
                        {leave.status === "Pending" ? "Action:" : "Status:"}
                        </p>&nbsp;&nbsp;
                        {leave.status === "Pending" ? (
                            <div className="leave-rej-pen-btn">
                                <button style={{backgroundColor: "#008000b7"}}
                                 onClick={() => changeStatus(leave._id, "Approved")}
                                 >Approve</button>
                                <button style={{backgroundColor: "tomato"}}
                                 onClick={() => changeStatus(leave._id, "Rejected")}
                                 >Reject</button>
                            </div>    
                        ) :
                        <p>{leave.status}</p>
                    }
                </div>

            </div>
            </div>

            </div>
        </div>
        ): <div> Loading...</div> }</>
    )
}

export default Detail