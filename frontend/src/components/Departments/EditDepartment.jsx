import React,{ useState, useEffect }from "react";
import '../Dashboard/Admin.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate()
    

    useEffect(() => {
        const fetchDepartments = async () => {
         setDepLoading(true)
         try {
             const responnse = await axios.get(
                 `http://localhost:5000/api/department/${id}`, {
                 headers: {
                     Authorization : `Bearer ${localStorage.getItem('token')}`
                 },
             });
             if(responnse.data.success) {
                 setDepartment(responnse.data.department)
                 setFormData({
                    dep_name: responnse.data.department.dep_name,
                    description: responnse.data.department.description
                });
             }
         } catch(error) {
         if(error.response && !error.response.data.success) {
         }
        } finally {
         setDepLoading(false)
        }
        };
 
        fetchDepartments();
     }, []);
     const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})
       }
  
       const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
       }
    return (
        <>{depLoading ? <div>Loading ...</div> :
<div className='add-dep'>
           <div className="add-dep-title">
            <h3>Edit Department</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dep_name">Department Name</label><br />
                    <input
                     type="text" id="dep_name"
                     name="dep_name" 
                     onChange={handleChange} 
                     value={department.dep_name}
                     placeholder='Department Name' required/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description"
                    onChange={handleChange} 
                    value={department.description}
                    placeholder='Description'></textarea>
                </div>
                <button type="submit">Edit Department</button>
            </form>
           </div>

        </div> 
        }</>
       )
}

export default EditDepartment