import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
        <AuthProvider>

            <App />

        </AuthProvider>

    </BrowserRouter>

);


