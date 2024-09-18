import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [payslipDate, setPayslipDate] = useState('');
    const [generationMessage, setGenerationMessage] = useState('');
    const [error, setError] = useState('');

    const handleGeneratePayslip = async (e) => {
        e.preventDefault();

        if (!employeeId) {
            setError('Employee ID is required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/payslips/generate', {
                employeeId,
                payslipDate: payslipDate || null,
            });

            setGenerationMessage(`Payslip generated successfully. ID: ${response.data.id}`);
        } catch (error) {
            setError('Failed to generate payslip. Please try again.');
        }
    };

    return (
        <div className="manager-dashboard">
            <h1>Manager Dashboard</h1>
            <div>
                <Link to="/add-leave-balance" className="btn btn-primary">
                    Add/Update Leave Balance
                </Link>
            </div>
            <div>
                <Link to="/view-leave-balance" className="btn btn-secondary">
                    View Employee Leave Balance
                </Link>
            </div>
            <div>
                <Link to="/view-leave-requests" className="btn btn-info">
                    View All Leave Requests
                </Link>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Generate Employee Payslip</h2>
                <form onSubmit={handleGeneratePayslip}>
                    <div>
                        <label>Employee ID:</label>
                        <input
                            type="number"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Payslip Date (optional):</label>
                        <input
                            type="date"
                            value={payslipDate}
                            onChange={(e) => setPayslipDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Generate Payslip</button>
                </form>
                {generationMessage && <p>{generationMessage}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default ManagerDashboard;
