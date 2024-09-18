import React, { useState } from 'react';
import axios from 'axios';
import './ViewLeaveBalance.css'; // Import the CSS file

const ViewLeaveBalance = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [leaveBalance, setLeaveBalance] = useState(null);
    const [error, setError] = useState('');

    const handleFetchLeaveBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/leave-balances/${employeeId}`);
            setLeaveBalance(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch leave balance');
            setLeaveBalance(null);
        }
    };

    return (
        <div className="view-leave-balance-container"> {/* Apply the class here */}
            <h2>View Employee Leave Balance</h2>
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
                <button onClick={handleFetchLeaveBalance}>Fetch Leave Balance</button>
            </div>

            {leaveBalance && (
                <div>
                    <h3>Leave Balance for Employee ID: {employeeId}</h3>
                    <p>Sick Leave Balance: {leaveBalance.sickLeaveBalance}</p>
                    <p>Casual Leave Balance: {leaveBalance.casualLeaveBalance}</p>
                    <p>Earned Leave Balance: {leaveBalance.earnedLeaveBalance}</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ViewLeaveBalance;
