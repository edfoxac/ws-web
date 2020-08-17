import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://api.mesapp.com.br:3333',
  // baseURL: 'https://134.122.112.117:3333',
  // baseURL: 'http://localhost:3333',
});
export default api;
