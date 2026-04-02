import { addRequestInterceptor } from '../client'

const setupRequestInterceptor = () => {
    addRequestInterceptor(
        (config) => {
            const token = localStorage.getItem("access_token");

            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            } else {
                config.headers = {
                    ...config.headers,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default setupRequestInterceptor;