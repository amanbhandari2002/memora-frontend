import axios from "axios";
 // Ensure token is set to empty if not present


export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
     headers: {
    "Content-Type": "application/json"
  }
})


api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

})