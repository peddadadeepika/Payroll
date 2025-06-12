import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from "axios";
import * as XLSX from 'xlsx';
import '../Dashboard/Admin.css'

const LeaveList = () => {
    const { user } = useAuth([])
    const [leaves, setLeaves] = useState([])
    let sno = 1;
    const {id} = useParams()

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });               


            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
                console.log(error)
            }
        }              

    };

    useEffect(() => {
        fetchLeaves();
    }, []);


    const sendLeaveEmail = async () => {
    try {
        const res = await axios.post(`http://localhost:5000/api/leave/send/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });


        if (res.data.success) {
            alert("Leave data emailed successfully!");
        } else {
            alert("Failed to send email.");
        }
    } catch (error) {
        console.error("Email error:", error);
        alert("Error sending email.");
    }
};

  const exportToExcel = (leaves) => {
   console.log("Leaves Data:", leaves); // Debugging line to check data being passed
 
   if (!Array.isArray(leaves) || leaves.length === 0) {
     console.log("No leaves data to export!");
     return;
   }
 
   const exportData = leaves.map((leave, index) => {
     // Parse dates safely
     const startDate = leave.startDate ? new Date(leave.startDate) : null;
     const endDate = leave.endDate ? new Date(leave.endDate) : null;
     const days = new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate()

 
     const formattedStartDate = startDate && !isNaN(startDate) ? startDate.toLocaleDateString() : 'Invalid Date';
     const formattedEndDate = endDate && !isNaN(endDate) ? endDate.toLocaleDateString() : 'Invalid Date';
     const description = leave.reason || 'No description available';
 
     return {
       'S.No': index + 1,
       'Leave Type': leave.leaveType || '',
       'Days': days || '',
       'From': formattedStartDate,
       'To': formattedEndDate,
       'Description': description,
       'Status': leave.status || 'N/A',
     };
   });
 
   console.log("Export Data:", exportData); // Debugging line to check processed data
 
   // Generate the Excel file
   const worksheet = XLSX.utils.json_to_sheet(exportData);
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaves');
   XLSX.writeFile(workbook, 'LeaveDetails.xlsx');
 };

  
    return (
        <div className="leave">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex">
                 <button className="download-btn" onClick={() => exportToExcel(leaves)}>
            Download Excel
        </button>
                 {user.role === "admin" && (
    <button className="send-leave-btn" onClick={sendLeaveEmail} >
        Send Leave Info
    </button>
    
)}
                {user.role === "employee" &&
                <Link
                 to="/employee-dashboard/add-leave" className="btnn">
                    Apply  Leave
                </Link> }                  
            </div>

            <div className="tablee"><br />
            <table>
                <thead><tr>
                    <th>S NO</th>
                    <th>Leave Type </th>
                    <th>From</th>
                    <th>To</th>
                    <th>Description</th>
                    <th>Status</th>
                    </tr><br />
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr key= {leave._id} >
                        <td>{sno++}</td>
                        <td>{leave.leaveType}</td>
                        <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
} 

export default LeaveList