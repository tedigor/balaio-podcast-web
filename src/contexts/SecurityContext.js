import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from '../core/http/api-endpoints';
import http from '../core/http/axios';
import jwt_decode from "jwt-decode";

const { REACT_APP_TOKEN_HEADER, REACT_APP_TOKEN_STORAGE_KEY } = process.env;

const SecurityContext = React.createContext();

export const SecurityProvider = ({ children }) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const token = getToken();
        if (token && !user) {
            const { id } = jwt_decode(token);
            http.get(`${API_ENDPOINTS.users}/${id}`).then(res => {
                setUser(res.data);
            })
        }
    })

    const login = (credentials) => {
        return http.post(API_ENDPOINTS.login, credentials).then(res => {
            if (res.status === 200) {
                const token = res.headers[REACT_APP_TOKEN_HEADER];
                setToken(token);
            }
        });
    }

    const logout = () => {
        localStorage.removeItem(REACT_APP_TOKEN_STORAGE_KEY);
        window.location.reload();
    }

    const getToken = () => {
        return localStorage.getItem(REACT_APP_TOKEN_STORAGE_KEY)
    }

    const setToken = (token) => {
        setUser(null);
        localStorage.setItem(REACT_APP_TOKEN_STORAGE_KEY, token);
    }

    const isUserAuthenticated = () => {
        return !!localStorage.getItem(REACT_APP_TOKEN_STORAGE_KEY);
    }

    const isUserAdmin = () => {
        return user && user.role === 'ADMIN';
    }

    const signin = (user) => {
        return http.post(API_ENDPOINTS.signin, user).then(() => {
            window.location.reload();
        });
    }

    return (
        <SecurityContext.Provider value={{
            user,
            isUserAuthenticated,
            login,
            logout,
            isUserAdmin,
            signin
        }}>
            {children}
        </SecurityContext.Provider>
    );

}


export default SecurityContext;