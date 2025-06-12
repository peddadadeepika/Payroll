import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'

dotenv.config();
connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)

mongoose.connect(process.env.MONGODB_URL)
   .then(() =>
console.log("✅ MongoDB connected"))
   .catch((err) => console.log("❌ mongodb error"));


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})
