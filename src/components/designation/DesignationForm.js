import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DesignationForm.css';

const DesignationForm = ({ id, isEdit, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [designationId, setDesignationId] = useState('');

    useEffect(() => {
        if (isEdit && id) {
            const fetchDesignation = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/designations/getDesignationById/${id}`);
                    const designation = response.data;
                    setDesignationId(designation.id); // Set the designation ID
                    setTitle(designation.title);
                } catch (error) {
                    console.error('Error fetching designation details:', error);
                }
            };
            fetchDesignation();
        } else {
            setDesignationId('');
            setTitle(''); // Clear the form for adding a new designation
        }
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:8080/api/designations/updateDesignation/${id}`, { title });
            } else {
                await axios.post('http://localhost:8080/api/designations/PostDesignation', { title });
            }
            onSubmit(); // Notify parent component to refresh the list
        } catch (error) {
            console.error('Error submitting designation:', error);
        }
    };

    return (
        <div className="designation-form-container">
            <h2>{isEdit ? 'Edit Designation' : 'Add Designation'}</h2>
            <form onSubmit={handleSubmit}>
                {isEdit && designationId && (
                    <div>
                        <label>Designation ID:</label>
                        <input type="text" value={designationId} readOnly />
                    </div>
                )}
                <label>
                    Designation Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default DesignationForm;
