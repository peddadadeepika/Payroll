import React, { useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom"
import axios from "axios";
import { useAuth } from "../../context/authContext";
import '../Dashboard/Admin.css'

const View = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;
    const {user} = useAuth()

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data)
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
      const filteredRecords = salaries.filter((leave) =>
        leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
    };

    return (
        <>
        <div className="view-sal">
        {filteredSalaries === null ? (
            <div>Loading....</div>
        ) : (
            <div className="view-salary">
          <div >
            <h2>Salary History</h2>
          </div>
          

          {filteredSalaries.length > 0 ?(
            <div className="table"><br />
            <table>
                <thead><tr>
                    <th>S NO</th>
                    <th>Emp ID </th>
                    <th>Salary</th>
                    <th>Allowance</th>
                    <th>Deduction</th>
                    <th>Total</th>
                    <th>Pay Date</th>
                    </tr><br />
                </thead>
                <tbody>
                    {filteredSalaries.map((salary) => (
                        <tr key= {salary._id} >
                        <td>{sno++}</td>
                        <td>{salary.employeeId.employeeId}</td>
                        <td>{salary.basicSalary}</td>
                        <td>{salary.allowances}</td>
                        <td>{salary.deductions}</td>
                        <td>{salary.netsalary}</td>
                        <td>{new Date(salary.payDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          ) : (<div>No Records</div> 

          )}
          </div>
        )}
         </div>
        </>
    );
};

export default View;