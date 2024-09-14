import React, {createContext, useState} from 'react';
import {useHistory} from "react-router";

const AuthContext = createContext();
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
    const history = useHistory();

    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    const [authState, setAuthState] = useState({
        token,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : {}
    });

    const setAuthInfo = ({token, userInfo, expiresAt}) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('expiresAt', expiresAt);
        setAuthState({
            token,
            userInfo,
            expiresAt
        })
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expiresAt');
        setAuthState({
            token: null,
            userInfo: {},
            expiresAt: null
        });

        history.push('/login');
    }

    const isAuthenticated = () => {
        // check if the JSON token is expired.
        // check if there is a token in authState
        if (!authState.token || !authState.expiresAt) {
            return false;
        }

        // Get the current time in seconds
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        console.log('currentTimeInSeconds::: ', currentTimeInSeconds);
        console.log('authState.expiresAt::: ',  authState.expiresAt);
        console.log('isAuthenticated::: ',currentTimeInSeconds < authState.expiresAt )
        return currentTimeInSeconds < authState.expiresAt;
    }

    const isAdmin = () => {
        return authState.userInfo.role === 'admin';
    }



    return (
        <Provider
            value={{
                authState,
                setAuthState: authInfo => setAuthInfo(authInfo),
                isAuthenticated,
                logout,
                isAdmin
            }}
        >
            {children}
        </Provider>
    );
};

export {AuthContext, AuthProvider};
