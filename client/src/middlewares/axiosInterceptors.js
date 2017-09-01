import axios from 'axios';
import config from '../config'

axios.defaults.baseURL = `http://${config.api_host}:${config.api_port}`

const setupAxiosInterceptors = (onUnauthenticated) => {
    const onRequestSuccess = config => {
        var token = localStorage.getItem('auth-token');
        if (token) {
            config.headers['Authorization'] = 'Bearer '.concat(token);
        }
        config.timeout = 10000;
        return config;
    };
    const onResponseSuccess = (response) => response;
    const onResponseError = error => {
        if (error.response.status === 403 || error.response.status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(error);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
    setupAxiosInterceptors
};
