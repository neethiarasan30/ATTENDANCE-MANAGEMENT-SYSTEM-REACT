import React, { useState } from 'react';
import axios from 'axios';
import './ViewAttendance.css';

const ViewAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const employeeId = localStorage.getItem('employeeId'); // Assuming employee ID is stored in local storage

    const fetchAttendanceRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/attendance/viewAttendance/${employeeId}`, {
                params: { startDate, endDate }
            });
            setAttendanceRecords(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch attendance records');
            setAttendanceRecords([]);
        }
    };

    const handleFetch = () => {
        fetchAttendanceRecords();
    };

    return (
        <div className="view-attendance">
            <h2>View Attendance</h2>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={handleFetch}>Fetch Records</button>
            </div>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                        <th>Worked Hours</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map(record => (
                        <tr key={record.id}>
                            <td>{record.date.split('T')[0]}</td>
                            <td>{record.checkInTime ? record.checkInTime.split('T')[1] : 'N/A'}</td>
                            <td>{record.checkOutTime ? record.checkOutTime.split('T')[1] : 'N/A'}</td>
                            <td>{record.workedHours}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAttendance;
