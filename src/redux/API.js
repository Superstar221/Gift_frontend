import axios from "axios";

const API = axios.create({
    baseURL: `http://192.168.116.120:5000/api/v1`,
    withToken: true,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {
    if (config.withToken) {
        const token = localStorage.token || sessionStorage.token;
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.common.Authorization = `Bearer ${
                localStorage.token || sessionStorage.token
            }`;
        }
    }

    return config;
});

export default API;
