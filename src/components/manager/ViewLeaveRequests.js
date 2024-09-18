import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewLeaveRequest.css'; // Import the CSS file

const ViewLeaveRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/leaves/all')
            .then(response => {
                console.log('Fetched leave requests:', response.data); // Check the data structure
                setLeaveRequests(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching leave requests!', error);
                setError('Error fetching leave requests');
                setLoading(false);
            });
    }, []);

    const handleApprove = (id) => {
        axios.put(`http://localhost:8080/api/leaves/approve/${id}`)
            .then(response => {
                console.log('Leave request approved:', response.data);
                setLeaveRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: 'Approved' } : request
                    )
                );
            })
            .catch(error => {
                console.error('There was an error approving the leave request!', error);
                setError('Error approving leave request');
            });
    };

    const handleReject = (id) => {
        axios.put(`http://localhost:8080/api/leaves/reject/${id}`)
            .then(response => {
                console.log('Leave request rejected:', response.data);
                setLeaveRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: 'Rejected' } : request
                    )
                );
            })
            .catch(error => {
                console.error('There was an error rejecting the leave request!', error);
                setError('Error rejecting leave request');
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="view-leave-requests-container"> {/* Apply the class here */}
            <h2>Leave Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.length > 0 ? (
                        leaveRequests.map(request => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.employeeName || 'N/A'}</td>
                                <td>{request.leaveType}</td>
                                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                                <td>{request.status}</td>
                                <td>
                                    {request.status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleApprove(request.id)}>Approve</button>
                                            <button onClick={() => handleReject(request.id)}>Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No leave requests found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewLeaveRequests;
