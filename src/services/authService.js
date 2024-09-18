import axios from 'axios';

const login = (username, password) => {
    console.log('Sending login request:', { username, password });
    return axios.post('http://localhost:8080/api/auth/login', 
        { username, password },
        { withCredentials: true } // Ensure credentials are included
    );
};

const authService = {
    login,
};

export default authService;
