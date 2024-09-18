import React, { useState } from 'react';
import axios from 'axios';
import './LeaveBalanceForm.css'; // Import the CSS file

const LeaveBalanceForm = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [sickLeave, setSickLeave] = useState(0);
    const [casualLeave, setCasualLeave] = useState(0);
    const [earnedLeave, setEarnedLeave] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const leaveBalances = {
            "Sick Leave": sickLeave,
            "Casual Leave": casualLeave,
            "Earned Leave": earnedLeave,
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/leave-balances/updateLeaveBalance/${employeeId}`, leaveBalances);
            setMessage('Leave balance updated successfully!');
            setError('');
        } catch (err) {
            setError('Failed to update leave balance');
            setMessage('');
        }
    };

    return (
        <div className="leave-balance-container"> {/* Apply the class here */}
            <h2>Update Leave Balance</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sick Leave Balance:</label>
                    <input
                        type="number"
                        value={sickLeave}
                        onChange={(e) => setSickLeave(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Casual Leave Balance:</label>
                    <input
                        type="number"
                        value={casualLeave}
                        onChange={(e) => setCasualLeave(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Earned Leave Balance:</label>
                    <input
                        type="number"
                        value={earnedLeave}
                        onChange={(e) => setEarnedLeave(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Leave Balance</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LeaveBalanceForm;
