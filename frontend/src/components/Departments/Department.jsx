import React,{ useEffect, useState } from "react";
import "../Dashboard/Admin.css"
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper"
import axios from "axios";
import * as XLSX from 'xlsx';

const Department = () => {
    const [departments, setDepartments] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = () => {
        fetchDepartments()
    }
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const responnse = await axios.get(
                    'http://localhost:5000/api/department', {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if(responnse.data.success) {
                    let sno = 1;
                    console.log(responnse.data)
                const data = await responnse.data.departments.map((dep) => (
                    {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
                    }
                ));
                setDepartments(data)
                setFilteredDepartments(data)

                
                }
            } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
           } finally {
            setDepLoading(false)
           }
           };   

       const exportToExcel = (data) => {
    const exportData = data.map(dep => ({
        'S.No.': dep.sno,
        'Department Name': dep.dep_name,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Departments');
    XLSX.writeFile(workbook, 'Departments.xlsx');
};
    
    useEffect(() => {
      
       fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) => 
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)
    }
    return (
        <>{depLoading ? <div>Loading...</div> : 
        <div className="department">
            <div className="dep-title">
                <h3>Manage Departments</h3>
            </div>
            <div className="search">
               

                <input type="text" placeholder="Search By Dep Name" 
                onChange={filterDepartments}
                />
                <Link to="/admin-dashboard/add-department">Add New Deparment</Link>
                 <button className="download-btn" onClick={() => exportToExcel(filteredDepartments)}>
  Download Excel
</button>
            </div><br />
              <div className="dep-table">
                <DataTable columns={columns} data={filteredDepartments} pagination/>


              </div>
           



        </div>
        }</>
    )
}

export default Department