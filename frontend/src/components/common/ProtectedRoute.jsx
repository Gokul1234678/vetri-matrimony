import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import PageLoader from "./PageLoader";

function ProtectedRoute({

    children,

    role

}) {

    const {

        loading,

        isAuthenticated,

        user

    } = useAuth();

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return <PageLoader />;

    }

    // ==========================
    // Not Logged In
    // ==========================

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    // ==========================
    // Role Check
    // ==========================

    if (role && user.role !== role) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;