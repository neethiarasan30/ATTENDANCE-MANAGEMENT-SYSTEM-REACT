// src/components/OpeningPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OpeningPage.css'; // Adjusted import path

const OpeningPage = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="opening-page">
            <h1>Attendance Management System</h1>
            <p>Welcome to the Attendance Management System. Please log in to continue.</p>
            <button onClick={handleLoginRedirect} className="login-button">
                Go to Login Page
            </button>
        </div>
    );
};

export default OpeningPage;
