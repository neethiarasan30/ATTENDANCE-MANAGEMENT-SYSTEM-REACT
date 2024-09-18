import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DepartmentForm.css';

const DepartmentForm = ({ id, isEdit, onSubmit }) => {
    const [name, setName] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [message, setMessage] = useState(''); // Added for alerts

    useEffect(() => {
        if (isEdit && id) {
            const fetchDepartment = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/departments/${id}`);
                    setDepartmentId(response.data.id); // Set the department ID
                    setName(response.data.name);
                } catch (error) {
                    console.error('Error fetching department details:', error);
                }
            };
            fetchDepartment();
        } else {
            setDepartmentId('');
            setName(''); // Clear the form for adding a new department
        }
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:8080/api/departments/updateDepartment`, { id: departmentId, name });
                setMessage('Department updated successfully!');
            } else {
                await axios.post('http://localhost:8080/api/departments/PostDepartment', { name });
                setMessage('Department added successfully!');
            }
            onSubmit(); // Notify parent component to refresh the list
        } catch (error) {
            console.error('Error submitting department:', error);
            setMessage('Error submitting department. Please try again.');
        }
    };

    return (
        <div className="department-form-container">
            <h2>{isEdit ? 'Edit Department' : 'Add Department'}</h2>
            {message && <div className="alert">{message}</div>}
            <form onSubmit={handleSubmit}>
                {isEdit && departmentId && (
                    <div>
                        <label>Department ID:</label>
                        <input type="text" value={departmentId} readOnly />
                    </div>
                )}
                <label>
                    Department Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default DepartmentForm;
