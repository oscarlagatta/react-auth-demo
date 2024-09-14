import axios from 'axios';


// for endpoints that do not require authentication.
const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export { publicFetch };
