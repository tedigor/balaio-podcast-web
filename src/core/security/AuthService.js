import API_ENDPOINTS from '../http/api-endpoints';
import http from '../http/axios';

const { REACT_APP_TOKEN_HEADER, REACT_APP_TOKEN_STORAGE_KEY } = process.env;

class AuthService {

    login(credentials) {
        return http.post(API_ENDPOINTS.login, credentials).then(res => {
            if (res.status === 200) {
                const token = res.headers[REACT_APP_TOKEN_HEADER];
                this.setToken(token);
            }
        });
    }

    getToken() {
        return localStorage.getItem(REACT_APP_TOKEN_STORAGE_KEY);
    }

    setToken(token) {
        localStorage.setItem(REACT_APP_TOKEN_STORAGE_KEY, token);
    }

}

const authService = new AuthService();
export default authService;