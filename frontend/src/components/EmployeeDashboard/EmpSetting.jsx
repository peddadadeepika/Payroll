import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import '../Dashboard/Admin.css';
import axios from "axios";

const EmpSetting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched");
        } else {
            try {
                const response = await axios.put(
                    "http://localhost:5000/api/setting/change-password",
                     setting, 
                     {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    navigate("/login");
                    setError("")
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                }
            }
        }
    };


    return (
        <div className="emp-setting">
            <div className="emp-set">
                <h2>Change Password</h2>
                <p>{error}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Old Password</label>
                        <input type="password" name="oldPassword" placeholder="Change Password" onChange={handleChange} required/>
                    </div><br />
                    <div>
                        <label>New Password</label>
                        <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required/>
                    </div><br />
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
                    </div><br />
  
                   <div className="set-btn">
                    <button type="submit">Change Password</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EmpSetting