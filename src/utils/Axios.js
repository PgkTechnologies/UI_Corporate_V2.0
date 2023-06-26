import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

// instance.defaults.headers.common['Content-Type'] = "application/json";
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
//instance.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
//instance.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';
//  instance.defaults.headers = {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//     'Expires': '0',
// };

instance.interceptors.request.use(
    (request) => {

        const token = localStorage.getItem('token');
       

        if (token && request?.url !== 'https://countriesnow.space/api/v0.1/countries/states') {
            request.headers.Authorization = 'Bearer ' + token;
        }

        return request;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);


export default instance;