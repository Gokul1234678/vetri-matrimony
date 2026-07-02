import axios from "axios";

// Create Axios Instance
const api = axios.create({

    // Backend URL
    baseURL: "http://localhost:5000",

    // Send Cookies Automatically
    withCredentials: true,

});

// Export
export default api;