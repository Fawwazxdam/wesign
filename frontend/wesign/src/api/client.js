import axios from 'axios';
import setupRequestInterceptor from './interceptors/request';
import setupResponseInterceptor from './interceptors/response';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// Setup interceptors
setupRequestInterceptor(apiClient);
setupResponseInterceptor(apiClient);

export default apiClient;