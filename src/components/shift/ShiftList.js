import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShiftForm from './ShiftForm';
import './ShiftList.css';

const ShiftList = () => {
    const [shifts, setShifts] = useState([]);
    const [currentShift, setCurrentShift] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchShifts();
    }, []);

    const fetchShifts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/shifts/getAllShifts');
            setShifts(response.data);
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }
    };

    const handleEdit = (shift) => {
        setCurrentShift(shift);
        setIsEdit(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/shifts/deleteShift/${id}`);
            fetchShifts();
        } catch (error) {
            console.error('Error deleting shift:', error);
        }
    };

    const handleFormSubmit = () => {
        setCurrentShift(null);
        setIsEdit(false);
        fetchShifts();
    };

    return (
        <div>
            <ShiftForm id={currentShift?.id} isEdit={isEdit} onSubmit={handleFormSubmit} />

            <div className="shift-list-container">
                <h2>Shift List</h2>
                <ul>
                    {shifts.length === 0 ? (
                        <li className="no-shifts">No shifts available</li>
                    ) : (
                        shifts.map((shift) => (
                            <li key={shift.id}>
                                <span>Shift ID: {shift.id} - {shift.shiftName} ({shift.startTime} - {shift.endTime})</span>
                                <div>
                                    <button className="edit-button" onClick={() => handleEdit(shift)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(shift.id)}>Delete</button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ShiftList;
