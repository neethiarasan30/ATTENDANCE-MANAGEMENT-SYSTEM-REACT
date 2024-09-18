import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Attendance.css';

const Attendance = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const employeeId = localStorage.getItem('employeeId');

    const handleCheckIn = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/attendance/checkIn/${employeeId}`);
            setMessage(`Checked in successfully at ${response.data.checkInTime}`);
        } catch (err) {
            setError('Failed to check in');
            setMessage('');
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/attendance/checkOut/${employeeId}`);
            setMessage(`Checked out successfully at ${response.data.checkOutTime}`);
        } catch (err) {
            setError('Failed to check out');
            setMessage('');
        }
    };

    return (
        <div className="attendance"> {/* Apply the attendance class here */}
            <h2>Mark Attendance</h2>
            <button onClick={handleCheckIn}>Check In</button>
            <button onClick={handleCheckOut}>Check Out</button>
            <div>
                <Link to="/view-attendance" className="btn btn-secondary">
                    View Attendance
                </Link>
            </div>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Attendance;
