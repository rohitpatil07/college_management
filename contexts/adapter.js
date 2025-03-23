import axios from 'axios';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const api = axios.create({
  baseURL: SERVER,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default api;
