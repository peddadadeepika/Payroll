import React, { useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper.jsx";
import axios from "axios";
import { exportToExcel } from '../../utils/LeaveHelper.jsx'


const Table = () => {
    const [leaves, setLeaves] = useState(null);
    const [filteredLeaves, setFilteredLeaves] = useState(null)
 

    const fetchLeaves = async () => {
        try {
            const responnse = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                }
            });


            if(responnse.data.success) {
                let sno = 1;

            const data = await responnse.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType:leave.leaveType,
                    department:leave.employeeId.department.dep_name,
                    days:
                        new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />
                }));
            setLeaves(data);
            setFilteredLeaves(data);
            }
        } catch(error) {
        if(error.responnse && !error.responnse.data.success) {
            alert(error.responnse.data.error)
        }
    }
}
    useEffect(() => { 
       fetchLeaves() 
    }, []);
        

    const filterByInput = (e) => {
        const data = leaves.filter(leave => leave.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
    };

    const filterByButton = (status) => {
        const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
    };

    


    return (
        <>
        {filteredLeaves ? (
        <div className="leaves">
            <div className="text-centerr">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flexx">
                <input
                 type="text" 
                 placeholder="search By Emp Name"
                 onChange={filterByInput}
                 />
                

            <div className="leave-btns">
                <button onClick={() => filterByButton("Pending")} > Pending</button>
                <button onClick={() => filterByButton("Approved")}>Approved</button>
                <button onClick={() => filterByButton("Rejected")}>Rejected</button>

                <button onClick={() => {exportToExcel(leaves)} }> Download Excel </button>
            </div>
                    
            </div><br />
              <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
        ) : <div> Loading ...</div>}
        </>
    )
}

export default Table;