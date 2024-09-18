import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './LoginPage.css'; // Adjusted import path

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(username, password);
            const { role: userRole, email, id } = response.data;

            // Check if the selected role matches the user's role
            if (userRole === role) {
                localStorage.setItem('username', email);
                if (userRole === 'employee') {
                    localStorage.setItem('employeeId', id);
                }
                switch (userRole) {
                    case 'admin':
                        navigate('/admin-dashboard');
                        break;
                    case 'manager':
                        navigate('/manager-dashboard');
                        break;
                    case 'employee':
                        navigate('/employee-dashboard');
                        break;
                    default:
                        alert('Unknown role');
                }
            } else {
                alert('Invalid credentials or incorrect role selected');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <select
                    className="login-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
