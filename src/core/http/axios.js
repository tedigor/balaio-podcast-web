import axios from 'axios';
import authService from '../security/AuthService';

const { REACT_APP_TOKEN_HEADER, REACT_APP_API_ENDPOINT } = process.env;

const http = axios.create({
    baseURL: REACT_APP_API_ENDPOINT
});

axios.interceptors.response.use(req => {
    const token = authService.getToken();
    if (!!token) {
        req.headers[REACT_APP_TOKEN_HEADER] = token;
    }
    req.headers["Content-Type"] = "application/json";
    return req;
});

export default http;