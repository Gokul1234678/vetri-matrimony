
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageLoader from "./PageLoader";

function ProtectedRoute({ children, role }) {
    const {
        loading,
        isAuthenticated,
        user
    } = useAuth();

    const location = useLocation();

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
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname + location.search }}
                replace
            />
        );
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
