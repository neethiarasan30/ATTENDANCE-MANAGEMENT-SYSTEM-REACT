import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Adjusted import path

const AdminDashboard = () => {
    const navigate = useNavigate();

    const goToDepartments = () => navigate('/departments');
    const goToDesignations = () => navigate('/designations');
    const goToShifts = () => navigate('/shifts');
    const goToManagers = () => navigate('/managers');
    const goToEmployees = () => navigate('/employees');

    const handleLogout = () => {
        // Clear authentication-related data (if stored)
        // Example: Remove token from localStorage or sessionStorage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! Manage your resources efficiently</p>
            <div className="button-container">
                <button onClick={goToDepartments}>Manage Departments</button>
                <button onClick={goToDesignations}>Manage Designations</button>
                <button onClick={goToShifts}>Manage Shifts</button>
                <button onClick={goToManagers}>Manage Managers</button>
                <button onClick={goToEmployees}>Manage Employees</button>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
