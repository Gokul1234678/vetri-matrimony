import axios from "axios";

// Create Axios Instance
const api = axios.create({

    // Backend URL
    baseURL: import.meta.env.VITE_BACKEND_URL,

    // Send Cookies Automatically
    withCredentials: true,

});

// Export
export default api;