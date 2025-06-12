import React, {useEffect, useState }from "react";
import '../Dashboard/Admin.css'
import { Link } from 'react-router-dom'
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as XLSX from 'xlsx';


const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee, setFilteredEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
         setEmpLoading(true)
         try {
             const response = await axios.get(
                 'http://localhost:5000/api/employee', {
                 headers: {
                     Authorization : `Bearer ${localStorage.getItem('token')}`,
                 },
             });

             if(response.data.success) {
                 let sno = 1;
                 console.log(response.data)

             const data =  response.data.employees.map((emp) => (
                 {
                     _id: emp._id,
                     sno: sno++,
                     dep_name: emp.department.dep_name,
                     name: emp.userId.name,
                     dob: new Date (emp.dob).toLocaleDateString(),
                     employeeId: emp.employeeId,
                     action: (<EmployeeButtons Id={emp._id}/>),
                 }
             ));
             setEmployees(data);
             
             setFilteredEmployees(data);
             }
         } catch(error) {
         if(error.response && !error.response.data.success) {
             alert(error.response.data.error)
         }
        } finally {
         setEmpLoading(false)
        }
        };
 
        fetchEmployees();
     }, []);

     const handlefilter = (e) => {
        const records = employees.filter((emp) => (
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
    }
    
    const exportToExcel = (data) => {
    const exportData = data.map(emp => ({
        'S.No.': emp.sno,
        'Employee-ID': emp.employeeId,
        'Employee Name': emp.name,
        'Department': emp.dep_name,
        'Date of Birth': emp.dob,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'Employees.xlsx');
};


    return (

        <div className="Employee">
            <div className="dep-title">
                <h3>Manage Employees</h3>
            </div>
            <div className="search">
                <input type="text" placeholder="Search By Emp Name" 
                onChange={handlefilter}

                />
                <Link to="/admin-dashboard/add-employee">Add New Employee</Link>
                <button  className="download-btn" onClick={() => exportToExcel(filteredEmployee)}>
    Download Excel
  </button>
            </div><br />
            <div>
                <DataTable columns={columns} data={filteredEmployee} pagination/>
            </div>
        </div>
   )
}

export default List