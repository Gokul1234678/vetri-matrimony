import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageLoader from "./PageLoader";

function GuestRoute({ children }) {
    const {
        loading,
        isAuthenticated,
        user
    } = useAuth();

    const location = useLocation();

    if (loading) {
        return <PageLoader />;
    }

    if (isAuthenticated) {
        const from = location.state?.from;

        if (from) {
            return children;
        }

        if (user.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }

        return <Navigate to="/user/dashboard" replace />;
    }

    return children;
}

export default GuestRoute;