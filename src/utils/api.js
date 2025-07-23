import axios from "axios";

//For setting up Axios instance with default configurations
const api = axios.create({
  baseURL: "http://localhost:5000/", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;