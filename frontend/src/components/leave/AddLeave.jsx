import React, { useState, } from "react";
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const AddLeave = () => {
    const {user} = useAuth();

if (!user) {
  return <div>Loading...</div>;
}


    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
  

    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setLeave((prevState) => ({...prevState, [name] : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/leave/add`,leave, {
                headers: {
                   Authorization : `Bearer ${localStorage.getItem('token')}`,

                },
            });
            if(response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            }
        } catch(error) {
        if(error.response && !error.response.data.success) {
        }
       }
    };


    return (
        <div className="Add-leave">
           <div className="req-leave">
            <h2>Request for Leave</h2>
    <form onSubmit={handleSubmit}>
        <div>
          <label>Leave Type</label><br />
            <select name="leaveType" onChange={handleChange} required > 
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Other">Other</option>

            </select>
        </div><br />
 
      <div className="leave-1st">
        <div className="leave-div">
            <label> From Date</label>
            <input type="date" name="startDate" onChange={handleChange} required/>
        </div>
        <div className="leave-div">
            <label>To Date</label>
            <input type="date" name="endDate" onChange={handleChange} required/>
        </div>
      </div><br />
      <div>
        <label> Description</label><br />
        <textarea name="reason" placeholder="Reason" onChange={handleChange} required></textarea>
      </div>
      <button type="submit">Apply Leave</button>
    </form>
        </div> 
         </div>
    )
}

export default AddLeave ;