import axios from "axios";

//For setting up Axios instance with default configurations
const api = axios.create({
  baseURL: "https://www.reddit.com/", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;