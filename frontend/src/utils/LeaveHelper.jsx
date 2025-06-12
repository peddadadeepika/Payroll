import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from 'xlsx';
import axios from "axios";
import { useAuth } from "../context/authContext.jsx";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "7%",
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "10%",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "13%",
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "18%",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "17%",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "9.1%",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "14%",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "",
    },
]

export const exportToExcel = (leaves) => {
  console.log("Leaves Data:", leaves); // Debugging line to check data being passed

  if (!Array.isArray(leaves) || leaves.length === 0) {
    console.log("No leaves data to export!");
    return;
  }

  const exportData = leaves.map((leave, index) => {
    // Parse dates safely

    return {
      'S.No': index + 1,
      'Employee ID': leave.employeeId || '',
      'Name': leave.name || '',
      'Leave Type': leave.leaveType || '',
      'Department': leave.department || '',
      'Days': leave.days || '',
      'Status': leave.status || 'N/A',
    };
  });

  console.log("Export Data:", exportData); // Debugging line to check processed data

  // Generate the Excel file
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaves');
  XLSX.writeFile(workbook, 'Leaves.xlsx');
};



export const LeaveButtons = ({ Id }) => {
    const navigate = useNavigate();
    const { user} = useAuth();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };



    return(
        <div className="view-leave-btn">
        
        <button  onClick={() => handleView(Id)}>
            View
        </button></div>
    );
};