import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShiftForm.css';

const ShiftForm = ({ id, isEdit, onSubmit }) => {
    const [shiftName, setShiftName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [shiftId, setShiftId] = useState('');

    useEffect(() => {
        if (isEdit && id) {
            const fetchShift = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/shifts/getShiftById/${id}`);
                    const shift = response.data;
                    setShiftId(shift.id);
                    setShiftName(shift.shiftName);
                    setStartTime(shift.startTime);
                    setEndTime(shift.endTime);
                } catch (error) {
                    console.error('Error fetching shift details:', error);
                }
            };
            fetchShift();
        } else {
            setShiftId('');
            setShiftName('');
            setStartTime('');
            setEndTime('');
        }
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:8080/api/shifts/updateShift/${id}`, { shiftName, startTime, endTime });
            } else {
                await axios.post('http://localhost:8080/api/shifts/postShift', { shiftName, startTime, endTime });
            }
            onSubmit();
        } catch (error) {
            console.error('Error submitting shift:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{isEdit ? 'Edit Shift' : 'Add Shift'}</h2>
            <form onSubmit={handleSubmit}>
                {isEdit && shiftId && (
                    <div>
                        <label>Shift ID:</label>
                        <input type="text" value={shiftId} readOnly />
                    </div>
                )}
                <label>
                    Shift Name:
                    <input
                        type="text"
                        value={shiftName}
                        onChange={(e) => setShiftName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default ShiftForm;
