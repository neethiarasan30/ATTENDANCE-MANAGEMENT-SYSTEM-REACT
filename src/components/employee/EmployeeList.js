import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm'; // Import EmployeeForm component
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees/getAllEmployee');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleAddClick = () => {
        setSelectedEmployee(null);
        setShowForm(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/employees/deleteEmployee/${id}`);
            fetchEmployees(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedEmployee(null); // Clear selected employee when form is closed
    };

    return (
        <div className="employee-list">
            <h1>Employee List</h1>
            <button onClick={handleAddClick} className="add-button">Add New Employee</button>
            {showForm && (
                <EmployeeForm
                    fetchEmployees={fetchEmployees}
                    employee={selectedEmployee}
                    onClose={handleFormClose}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Basic Salary</th>
                        <th>Department ID</th>
                        <th>Designation ID</th>
                        <th>Manager ID</th>
                        <th>Shift ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.basicSalary}</td>
                            <td>{employee.department?.id}</td>
                            <td>{employee.designation?.id}</td>
                            <td>{employee.manager?.id}</td>
                            <td>{employee.shift?.id}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
