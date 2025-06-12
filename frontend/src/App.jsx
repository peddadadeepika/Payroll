import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from "./pages/VerifyOtp";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes"
import DashboardContent from "./components/Dashboard/DashboardContent";
import Department from "./components/Departments/Department"
import AddDepartment from "./components/Departments/AddDepartment"
import EditDepartment from "./components/Departments/EditDepartment";
import ViewDepartmentEmployees from './components/Departments/ViewDepartment';
import List from "./components/employee/List"
import AddEmployee from "./components/employee/Add"
import ViewEmployee from "./components/employee/View";
import EditEmployee from "./components/employee/Edit";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import EmployeeSummary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from './components/leave/AddLeave';
import EmpSetting from './components/EmployeeDashboard/EmpSetting';
import Table from "./components/leave/Table";
import LeaveDetails from './components/leave/Details'

function App() {

  return (
    
    <BrowserRouter>
    <Routes>  
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/verify-otp" element={<VerifyOtp />}></Route>


      <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>


      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
        <AdminDashboard />
        </RoleBaseRoutes>
        </PrivateRoutes>

        }>
          <Route index element={<DashboardContent />}></Route>

          <Route path="/admin-dashboard/departments" element={<Department />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id/employees" element={<ViewDepartmentEmployees />} />
          
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<AddEmployee />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee />}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmployee />}></Route>

          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
           
          <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetails />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
          
          <Route path="/admin-dashboard/setting" element={<EmpSetting />}></Route>
        </Route>
      <Route path="/employee-dashboard" element={ 
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin", "employee"]}>
        <EmployeeDashboard />
        </RoleBaseRoutes>
        </PrivateRoutes>
        }
        >
          <Route index element={<EmployeeSummary />}></Route>

          <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/employee-dashboard/setting" element={<EmpSetting />}></Route>

          </Route>

    </Routes>
    </BrowserRouter>
    
  )
}

export default App
