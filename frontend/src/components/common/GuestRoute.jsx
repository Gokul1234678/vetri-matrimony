import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import PageLoader from "./PageLoader";

function GuestRoute({ children }) {

// why GuestRoute is used: GuestRoute is a wrapper component that 
// checks if the user is authenticated. If the user is authenticated, 
// it redirects them to their respective dashboard based on their role. 
// If the user is not authenticated, it renders the child component (in this case, the Login component).

    const { loading, isAuthenticated, user } = useAuth();

    if (loading) {

        return <PageLoader />;

    }

    if (isAuthenticated) {

        if (user.role === "admin") {

            return <Navigate to="/admin/dashboard" replace />;

        }

        return <Navigate to="/user/dashboard" replace />;

    }

    return children;

}

export default GuestRoute;