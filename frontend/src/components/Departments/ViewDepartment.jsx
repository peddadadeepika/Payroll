import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewDepartment = () => {
    const { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/department/${id}/employees`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.data.success) {
                    setEmployees(res.data.employees);
                } else {
                    alert(res.data.error);
                }
            } catch (error) {
                alert("Error fetching employees");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [id]);

    return (
        <div className='view-dep'>
            <h3>Employees in Department</h3>
            {loading ? <div>Loading...</div> :
                employees.length === 0 ? <div>No Employees Found</div> :
                    <ul>
                        {employees.map((emp, index) => (
                            <li key={emp._id}>{index + 1}. {emp.employeeId}</li>
                        ))}
                    </ul>
            }
        </div>
    );
};

export default ViewDepartment;
