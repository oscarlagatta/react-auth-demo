import React, {lazy, useContext, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import AppShell from './AppShell';
import {AuthContext, AuthProvider} from './context/AuthContext';
import {FetchProvider} from './context/FetchContext';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Account = lazy(() => import('./pages/Account'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));

export const AuthenticatedRoute = ({children, ...rest}) => {
    const authContext = useContext(AuthContext);
    return (<Route {...rest} render={() => (authContext.isAuthenticated() ? (<AppShell>
        {children}
    </AppShell>) : (<Redirect to='/'/>))}/>)
}


export const AdminRoute = ({children, ...rest}) => {
    const authContext = useContext(AuthContext);
    return (<Route {...rest} render={() => (authContext.isAuthenticated() && authContext.isAdmin() ? (<AppShell>
        {children}
    </AppShell>) : (<Redirect to='/'/>))}/>)
}


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route exact path="/" component={Home}/>
                <AuthenticatedRoute path="/dashboard">
                    <Dashboard/>
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/inventory">
                    <Inventory/>
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/account">
                    <Account/>
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/settings">
                    <Settings/>
                </AuthenticatedRoute>
                <AdminRoute path="/users">
                    <Users/>
                </AdminRoute>
                <Route path="*" component={FourOFour}/>
            </Switch>
        </Suspense>

    );
};

const apiUrl = 'http://localhost:3001/api';
const accessToken = 'blablablabla';
// axios.interceptors.request.use(
//     config => {
//         config.headers.authorization = `Bearer ${accessToken}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

// Create a specific axios instance
// const authAxios = axios.create({
//     baseURL: apiUrl,
//     headers: {
//         Authorization: `Bearer ${accessToken}`
//     }
// });

function App() {

    // const [users, setUsers] = useState([]);
    // const [requestError, setRequestError] = useState([]);
    //
    // const fetchData = useCallback(async () => {
    //     try {
    //         // fetch and set users
    //         const result = await authAxios.get(`${apiUrl}/users`);
    //         setUsers(result.data.users);
    //         console.log(result.data.users);
    //     } catch (err) {
    //         // set request error message
    //         setRequestError(err.message)
    //     }
    // },);

    return (
        <Router>
            <AuthProvider>
                <FetchProvider>
                    <div className="bg-gray-100">
                        <AppRoutes/>
                    </div>
                </FetchProvider>
            </AuthProvider>
        </Router>);
}

export default App;

// <div className='App'>
//
//     <button onClick={() => fetchData()}
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-20'>Get Users
//     </button>
//     {users && users.map(user => {
//
//         return <p key={user.id}>{user.firstName} {user.lastName}</p>
//     })}
//
//
// </div>
