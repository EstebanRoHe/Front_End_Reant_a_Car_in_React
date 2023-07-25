import axios from 'axios';

const api = axios.create({
  
 //baseURL: 'http://localhost:8081',
 baseURL: 'https://back-end-rent-a-car-in-spring-boot.onrender.com',
  headers: {
    'Content-Type': 'application/json'
    ,'Access-Control-Allow-Origin': '*' 
  }
});

export default api;




