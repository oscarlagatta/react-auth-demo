import axios from 'axios';
import React, {createContext, useEffect} from 'react';

const FetchContext = createContext();

const {Provider} = FetchContext;

const FetchProvider = ({children}) => {
    // const authContext = useContext(AuthContext);
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } =await authAxios.get('/csrf-token');
            console.log(data)
        }
        getCsrfToken();
    }, []);

    // authAxios.interceptors.request.use(
    //     config => {
    //         config.headers.authorization = `Bearer ${authContext.authState.token}`;
    //         return config;
    //     },
    //     error => {
    //         return Promise.reject(error)
    //     }
    // )

    return (
        <Provider
            value={{
                authAxios
            }}
        >
            {children}
        </Provider>
    );
};

export {FetchContext, FetchProvider};
