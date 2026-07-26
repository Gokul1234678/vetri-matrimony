import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import ContactUs from "../pages/public/ContactUs";

// User Pages
import UserDashboard from "../pages/user/UserDashboard";
import BrowseProfiles from "../pages/user/BrowseProfiles";
import ProfileDetails from "../pages/user/ProfileDetails";
import MyProfile from "../pages/user/MyProfile";
import UnlockedProfiles from "../pages/user/UnlockedProfiles";

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

            <Route path="/contact-us" element={<ContactUs />} />



            {/* User */}

            <Route
                path="/user/dashboard"
                element={
                    <ProtectedRoute role="user">
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />

            {/* browse profiles */}
            <Route path="/browse-profiles"
                element={
                    <ProtectedRoute role="user">
                        <BrowseProfiles />
                    </ProtectedRoute>
                } />

            {/* profile details */}
            <Route
                path="/profiles/:id"
                element={
                    <ProtectedRoute role="user">
                        <ProfileDetails />
                    </ProtectedRoute>
                } />

            {/* my profile */}
            <Route
                path="/my-profile"
                element={
                    <ProtectedRoute>
                        <MyProfile />
                    </ProtectedRoute>
                }
            />

            {/* unlocked profiles */}
            <Route
                path="/unlocked-profiles"
                element={
                    <ProtectedRoute>
                        <UnlockedProfiles />
                    </ProtectedRoute>
                }
            />
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