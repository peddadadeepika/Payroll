import React from "react";
import { FaUsers } from 'react-icons/fa'
  import { useAuth } from '../../context/authContext'

const Summary = () => {
        const {user} = useAuth()
    return (
        <div className="emp-summary">
        <div className="emp-content">
            <div className="justify">
       <FaUsers className="icon teal" />     
       </div>
            <div className="payer">
                <p className="font">Welcome Back</p>
                <p className="integer" style={{fontWeight: "bold"}}>{user.name}</p>
            </div>
        </div>
        </div>
    )
}

export default Summary;