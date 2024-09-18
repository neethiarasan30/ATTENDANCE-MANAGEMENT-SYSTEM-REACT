import React, { useEffect, useState } from "react";
import DepartmentForm from "./DepartmentForm";
import axios from "axios";
import './DepartmentList.css';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        fetchDepartments();
    }, [formKey]); // Add formKey as dependency to refresh list after adding/editing

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/departments/getAllDepartment");
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const handleEdit = (id) => {
        setIsEdit(true);
        setEditId(id);
        setFormKey((prevKey) => prevKey + 1);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/departments/deleteDepartment/${id}`);
            fetchDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    const handleFormSubmit = () => {
        setIsEdit(false);
        setEditId(null);
        setFormKey((prevKey) => prevKey + 1); // Increment formKey to refresh the form
        fetchDepartments();
    };

    return (
        <div className="department-container">
            <DepartmentForm
                id={editId}
                isEdit={isEdit}
                onSubmit={handleFormSubmit}
                key={formKey}
            />
            <div className="department-list-container">
                <h2>Department List</h2>
                <table className="department-list-table">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length > 0 ? (
                            departments.map((department) => (
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.name}</td>
                                    <td>
                                        <div className="button-container">
                                            <button
                                                className="edit"
                                                onClick={() => handleEdit(department.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={() => handleDelete(department.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No departments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentList;
