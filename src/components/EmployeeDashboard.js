import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [leaveType, setLeaveType] = useState('Sick Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveRequestMessage, setLeaveRequestMessage] = useState('');
    const [showLeaveForm, setShowLeaveForm] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [showLeaveRequests, setShowLeaveRequests] = useState(false);
    const [leaveBalance, setLeaveBalance] = useState(null);
    const [showLeaveBalance, setShowLeaveBalance] = useState(false);
    const [payslipMessage, setPayslipMessage] = useState('');
    const [attendanceReportMessage, setAttendanceReportMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const email = localStorage.getItem('username');
                if (!email) {
                    setError('No email found in local storage.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8080/api/employees/getEmployeeByEmail?email=${email}`);
                if (response.data) {
                    setEmployee(response.data);
                    fetchLeaveRequests(response.data.id);
                    fetchLeaveBalance(response.data.id);
                } else {
                    setError('Employee not found.');
                }
            } catch (err) {
                setError('Failed to fetch employee details');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, []);

    const fetchLeaveRequests = async (employeeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/leaves/employee/${employeeId}`);
            setLeaveRequests(response.data);
        } catch (err) {
            setError('Failed to fetch leave requests.');
        }
    };

    const fetchLeaveBalance = async (employeeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/leave-balances/${employeeId}`);
            setLeaveBalance(response.data);
        } catch (err) {
            setError('Failed to fetch leave balance.');
        }
    };

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleNavigateToAttendance = () => {
        navigate('/attendance');
    };

    const handleRequestLeave = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            setLeaveRequestMessage('Please provide both start and end dates.');
            return;
        }

        try {
            const leaveRequestData = {
                employeeId: employee.id,
                leaveType,
                startDate,
                endDate
            };

            await axios.post('http://localhost:8080/api/leaves/request', leaveRequestData);
            setLeaveRequestMessage('Leave request submitted successfully.');
            fetchLeaveRequests(employee.id);
        } catch (error) {
            setLeaveRequestMessage('Failed to submit leave request. Please try again.');
        }
    };

    const toggleLeaveForm = () => {
        setShowLeaveForm(!showLeaveForm);
    };

    const toggleLeaveRequests = () => {
        setShowLeaveRequests(!showLeaveRequests);
    };

    const toggleLeaveBalance = () => {
        setShowLeaveBalance(!showLeaveBalance);
    };

    const handleGenerateAndDownloadPayslip = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/payslipReports/generate/${employee.id}`, {
                responseType: 'blob' // Important for handling binary data
            });

            // Create a URL for the PDF blob
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `payslip_${employee.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setPayslipMessage('Payslip generated and downloaded successfully.');
        } catch (error) {
            setPayslipMessage('Failed to generate and download payslip.');
        }
    };

    const handleDownloadAttendanceReport = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/attendanceReport/download/${employee.id}`, {
                responseType: 'blob' // Important for handling binary data
            });

            // Create a URL for the PDF blob
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `attendance_report_${employee.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setAttendanceReportMessage('Attendance report generated and downloaded successfully.');
        } catch (error) {
            setAttendanceReportMessage('Failed to generate and download attendance report.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="employee-dashboard">
            <h2>Employee Dashboard</h2>
            {employee ? (
                <div>
                    {!showDetails ? (
                        <div className="details-container">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>{employee.firstName} {employee.lastName}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={handleToggleDetails}>View Full Details</button>
                        </div>
                    ) : (
                        <div className="details-container">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>First Name:</strong></td>
                                        <td>{employee.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Last Name:</strong></td>
                                        <td>{employee.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>{employee.email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone Number:</strong></td>
                                        <td>{employee.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Basic Salary:</strong></td>
                                        <td>{employee.basicSalary}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Department:</strong></td>
                                        <td>{employee.department ? employee.department.name : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Designation:</strong></td>
                                        <td>{employee.designation ? employee.designation.title : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Manager:</strong></td>
                                        <td>{employee.manager ? `${employee.manager.firstName} ${employee.manager.lastName}` : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Shift:</strong></td>
                                        <td>{employee.shift ? employee.shift.shiftName : 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={handleToggleDetails}>Hide Details</button>
                        </div>
                    )}

                    <button onClick={handleNavigateToAttendance}>Go to Attendance</button>

                    <div className="payslip-container">
                        <button onClick={handleGenerateAndDownloadPayslip}>Download Payslip</button>
                        {payslipMessage && <p className="message">{payslipMessage}</p>}
                    </div>

                    <div className="attendance-report-container">
                        <button onClick={handleDownloadAttendanceReport}>Download Attendance Report</button>
                        {attendanceReportMessage && <p className="message">{attendanceReportMessage}</p>}
                    </div>

                    <div className="leave-form-container">
                        <button onClick={toggleLeaveForm}>
                            {showLeaveForm ? 'Hide Leave Request Form' : 'Show Leave Request Form'}
                        </button>
                        {showLeaveForm && (
                            <form onSubmit={handleRequestLeave}>
                                <div>
                                    <label>Leave Type:</label>
                                    <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Earned Leave">Earned Leave</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Start Date:</label>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div>
                                    <label>End Date:</label>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                <button type="submit">Request Leave</button>
                                {leaveRequestMessage && <p className="message">{leaveRequestMessage}</p>}
                            </form>
                        )}
                    </div>

                    <div className="leave-requests-container">
                        <button onClick={toggleLeaveRequests}>
                            {showLeaveRequests ? 'Hide Leave Requests' : 'Show Leave Requests'}
                        </button>
                        {showLeaveRequests && (
                            <div>
                                {leaveRequests.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Leave Type</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaveRequests.map((request) => (
                                                <tr key={request.id}>
                                                    <td>{request.leaveType}</td>
                                                    <td>{new Date(request.startDate).toLocaleDateString()}</td>
                                                    <td>{new Date(request.endDate).toLocaleDateString()}</td>
                                                    <td>{request.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No leave requests found.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="leave-balance-container">
                        <button onClick={toggleLeaveBalance}>
                            {showLeaveBalance ? 'Hide Leave Balance' : 'Show Leave Balance'}
                        </button>
                        {showLeaveBalance && leaveBalance && (
                            <div>
                                <p>Earned Leave Balance: {leaveBalance.earnedLeaveBalance}</p>
                                <p>Sick Leave Balance: {leaveBalance.sickLeaveBalance}</p>
                                <p>Casual Leave Balance: {leaveBalance.casualLeaveBalance}</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>No employee data available.</p>
            )}
        </div>
    );
};

export default EmployeeDashboard;
