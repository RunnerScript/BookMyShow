import axios from 'axios';
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${localStorage.getItem('access_token')}`
    }
});

export default axiosInstance; 