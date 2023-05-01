import axios from 'axios';
const URL = 'http://localhost:3001/api/v1/'; //Dev
const instance = axios.create({
    baseURL: URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
    },
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token') || "";
instance.interceptors.response.use((response) => {
    if (response.status === 401) {
        window.location.href = '/';
    } 
    else 
    return response;
}, function (error) {
    return error;
});

export default instance;