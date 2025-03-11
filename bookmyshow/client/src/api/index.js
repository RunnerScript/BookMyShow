import axios from 'axios';
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',

    }
});

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['x-access-token'] = `Bearer ${token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance; 