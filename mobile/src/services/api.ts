import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.237.64:4343'
})

export default api;