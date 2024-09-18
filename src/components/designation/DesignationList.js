import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DesignationForm from './DesignationForm';
import './DesignationList.css';

const DesignationList = () => {
    const [designations, setDesignations] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDesignations();
    }, []);

    const fetchDesignations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/designations/getAllDesignation');
            setDesignations(response.data);
        } catch (error) {
            console.error('Error fetching designations:', error);
        }
    };

    const handleEdit = (id) => {
        setIsEdit(true);
        setEditId(id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/designations/deleteDesignation/${id}`);
            fetchDesignations(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting designation:', error);
        }
    };

    const handleFormSubmit = () => {
        setIsEdit(false);
        setEditId(null);
        fetchDesignations(); // Refresh the list after adding or updating
    };

    return (
        <div className="designation-container">
            <DesignationForm id={editId} isEdit={isEdit} onSubmit={handleFormSubmit} />

            <h2>Designation List</h2>
            <div className="designation-table-container">
                <table className="designation-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designations.map((designation) => (
                            <tr key={designation.id}>
                                <td>{designation.id}</td>
                                <td>{designation.title}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(designation.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(designation.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DesignationList;
