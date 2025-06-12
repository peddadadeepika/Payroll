import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf
} from 'react-icons/fa'

import './Admin.css'

const DashboardContent = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get ('http://localhost:5000/api/dashboard/summary',{
          headers : {
              "Authorization" : `Bearer ${localStorage.getItem ('token')}`
          }
      })
      setSummary (summary.data)  
      } catch(error) {
        if(error.response) {
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary()
  }, [])
   if(!summary) {
    return <div>Loading..</div>
   }

  return (
    <main className="main-content">
      <h1 className="heading">Dashboard Overview</h1>

      <div className="cards-row">
        <div className="card">
          <FaUsers className="icon teal" />
          <div>
            <div className="card-title">Total Employees</div>
            <div className="card-value">{summary.totalEmployees}</div>
          </div>
        </div>

        <div className="card">
          <FaBuilding className="icon yellow" />
          <div>
            <div className="card-title">Total Departments</div>
            <div className="card-value">{summary.totalDepartments}</div>
          </div>
        </div>
        
        <div className="card">
          <FaMoneyBillWave className="icon red" />
          <div>
            <div className="card-title">Monthly Pay</div>
            <div className="card-value">₹{summary.totalSalary}</div>
          </div>
        </div>
      </div>

      <h2 className="subheading">Leave Details</h2>

      <div className="leave-section">
        <div className="cards-row">

          <div className="card">
            <FaFileAlt className="icon teal" />
            <div>
              <div className="card-title">Leave Applied</div>
              <div className="card-value">{summary.leaveSummary.appliedFor}</div>
              </div>
              </div>

          <div className="card">
            <FaCheckCircle className="icon green" />
            <div>
              <div className="card-title">Leave Approved</div>
            <div className="card-value">{summary.leaveSummary.approved}</div>
            </div>
            </div>
        </div>

        <div className="cards-row">
          <div className="card">
            <FaHourglassHalf className="icon yellow" />
            <div>
              <div className="card-title">Leave Pending</div>
            <div className="card-value">{summary.leaveSummary.pending}</div>
            </div>
            </div>
          <div className="card">
            <FaTimesCircle className="icon red" />
            <div>
              <div className="card-title">Leave Rejected</div>
            <div className="card-value">{summary.leaveSummary.rejected}</div>
            </div>
            </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardContent
