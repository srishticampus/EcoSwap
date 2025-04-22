import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'https://hybrid.srishticampus.in//',
  
  baseURL: 'http://localhost:8000/',
  
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 seconds
});


// export const imageBaseUrl = 'https://hybrid.srishticampus.in/'; 
// export const imageBaseUrl = 'http://localhost:8080'; 
// or for local: 'http://localhost:4053/'

export default axiosInstance;