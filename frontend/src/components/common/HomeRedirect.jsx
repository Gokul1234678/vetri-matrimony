import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Home from "../../pages/public/Home";

import Loader from "./PageLoader"; // Change this path if your loader is elsewhere

function HomeRedirect() {

    const {

        loading,

        isAuthenticated,

        user

    } = useAuth();

    if (loading) {

        return <Loader />;

    }

    if (isAuthenticated) {

        if (user.role === "admin") {

            return <Navigate to="/admin/dashboard" replace />;

        }

        return <Navigate to="/user/dashboard" replace />;

    }

    return <Home />;

}

export default HomeRedirect;