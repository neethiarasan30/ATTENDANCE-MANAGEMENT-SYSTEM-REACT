import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpeningPage from './components/OpeningPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import DepartmentList from './components/department/DepartmentList';
import DesignationList from './components/designation/DesignationList';
import ShiftList from './components/shift/ShiftList';
import ManagerList from './components/manager/ManagerList';
import EmployeeList from './components/employee/EmployeeList';
import AttendanceManagement from './components/attendance/Attendance';
import ViewAttendance from './components/attendance/ViewAttendance';
import LeaveBalanceForm from './components/leaveBalance/LeaveBalanceForm';
import ViewLeaveBalance from './components/leaveBalance/ViewLeaveBalance';
import ViewLeaveRequests from './components/manager/ViewLeaveRequests';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OpeningPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Dashboard Routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

                {/* Attendance Routes */}
                <Route path="/attendance" element={<AttendanceManagement />} />
                <Route path="/view-attendance" element={<ViewAttendance />} />

                {/* Management Routes */}
                <Route path="/departments" element={<DepartmentList />} />
                <Route path="/designations" element={<DesignationList />} />
                <Route path="/shifts" element={<ShiftList />} />
                <Route path="/managers" element={<ManagerList />} />
                <Route path="/employees" element={<EmployeeList />} />

                {/* Leave Balance Routes */}
                <Route path="/view-leave-requests" element={<ViewLeaveRequests />} />
                <Route path="/add-leave-balance" element={<LeaveBalanceForm />} />
                <Route path="/view-leave-balance" element={<ViewLeaveBalance />} />
            </Routes>
        </Router>
    );
}

export default App;
