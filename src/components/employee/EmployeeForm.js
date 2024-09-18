import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = ({ fetchEmployees, employee, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        basicSalary: '',
        departmentId: '',
        designationId: '',
        managerId: '',
        shiftId: '',
        password: ''
    });

    useEffect(() => {
        const fetchEmployeeData = async () => {
            if (employee) {
                try {
                    // Fetch the employee data if editing
                    const employeeRes = await axios.get(`http://localhost:8080/api/employees/getEmployeebyid/${employee.id}`);
                    const employeeData = employeeRes.data;

                    setFormData({
                        firstName: employeeData.firstName || '',
                        lastName: employeeData.lastName || '',
                        email: employeeData.email || '',
                        phoneNumber: employeeData.phoneNumber || '',
                        basicSalary: employeeData.basicSalary || '',
                        departmentId: employeeData.department ? employeeData.department.id : '',
                        designationId: employeeData.designation ? employeeData.designation.id : '',
                        managerId: employeeData.manager ? employeeData.manager.id : '',
                        shiftId: employeeData.shift ? employeeData.shift.id : '',
                        password: '' // Don't pre-fill password
                    });
                } catch (error) {
                    console.error('Error fetching employee data:', error);
                }
            }
        };

        fetchEmployeeData();
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare the form data to match what the backend expects
            const preparedData = {
                ...formData,
                department: { id: formData.departmentId },
                designation: { id: formData.designationId },
                manager: { id: formData.managerId },
                shift: { id: formData.shiftId }
            };

            if (employee) {
                // Update existing employee
                await axios.put(`http://localhost:8080/api/employees/updateEmployee/${employee.id}`, preparedData);
            } else {
                // Add new employee
                await axios.post('http://localhost:8080/api/employees/postEmployee', preparedData);
            }
            fetchEmployees();
            onClose();
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <div className="employee-form">
            <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="number"
                    name="basicSalary"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    placeholder="Basic Salary"
                    required
                />
                <input
                    type="text"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    placeholder="Department ID"
                    required
                />
                <input
                    type="text"
                    name="designationId"
                    value={formData.designationId}
                    onChange={handleChange}
                    placeholder="Designation ID"
                    required
                />
                <input
                    type="text"
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleChange}
                    placeholder="Manager ID"
                    required
                />
                <input
                    type="text"
                    name="shiftId"
                    value={formData.shiftId}
                    onChange={handleChange}
                    placeholder="Shift ID"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required={!employee}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
