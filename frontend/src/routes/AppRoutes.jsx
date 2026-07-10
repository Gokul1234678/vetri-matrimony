import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";

// User Pages
import UserDashboard from "../pages/user/UserDashboard";
// import ProfileDetails from "../pages/user/ProfileDetails";
// import MyProfile from "../pages/user/MyProfile";
// import UnlockedProfiles from "../pages/user/UnlockedProfiles";

// // Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
// import ManageProfiles from "../pages/admin/ManageProfiles";
// import CreateProfile from "../pages/admin/CreateProfile";
// import EditProfile from "../pages/admin/EditProfile";
// import Reports from "../pages/admin/Reports";

function AppRoutes() {

    return (

        <Routes>

            {/* Public */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            {/* User */}

<Route
    path="/user/dashboard"
    element={
        <ProtectedRoute role="user">
            <UserDashboard />
        </ProtectedRoute>
    }
/>

            {/* <Route path="/profiles/:id" element={<ProfileDetails />} />

            <Route path="/my-profile" element={<MyProfile />} />

            <Route path="/unlocked-profiles" element={<UnlockedProfiles />} />  */}

            {/* Admin */}

            <Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute role="admin">
            <AdminDashboard />
        </ProtectedRoute>
    }
/>
            {/* <Route path="/admin/profiles" element={<ManageProfiles />} />

            <Route path="/admin/profiles/create" element={<CreateProfile />} />

            <Route path="/admin/profiles/edit/:id" element={<EditProfile />} />

            <Route path="/admin/reports" element={<Reports />} /> */}

        </Routes>

    );

}

export default AppRoutes;