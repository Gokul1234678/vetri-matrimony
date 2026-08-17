import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../../assets/css/admin/sidebar.css";

import logo from "../../assets/images/logo.png";

function AdminSidebar({

    sidebarOpen,

    setSidebarOpen

}) {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    const closeSidebar = () => {

        setSidebarOpen(false);

    };

    return (

        <aside className={`admin-sidebar ${sidebarOpen ? "show" : ""}`}>

            {/* Mobile Close Button */}

            <button

                className="sidebar-close-btn"

                onClick={closeSidebar}

            >

                <i className="bi bi-x-lg"></i>

            </button>

            {/* Logo */}

            <div className="admin-logo">

                <img

                    src={logo}

                    alt="Vetri Matrimony"

                />

                <h2>Vetri Matrimony</h2>

                <span>Admin Panel</span>

            </div>

            {/* Navigation */}

            <nav className="admin-nav">

                <NavLink

                    to="/admin/dashboard"

                    onClick={closeSidebar}

                    className={({ isActive }) =>

                        isActive

                            ? "admin-nav-link active"

                            : "admin-nav-link"

                    }

                >

                    <i className="bi bi-house-door-fill"></i>

                    Dashboard

                </NavLink>

                <NavLink

                    to="/admin/profiles/create"

                    onClick={closeSidebar}

                    className={({ isActive }) =>

                        isActive

                            ? "admin-nav-link active"

                            : "admin-nav-link"

                    }

                >

                    <i className="bi bi-person-plus-fill"></i>

                    Create Profile

                </NavLink>

                <NavLink
    end
    to="/admin/profiles"
    onClick={closeSidebar}
    className={({ isActive }) =>
        isActive
            ? "admin-nav-link active"
            : "admin-nav-link"
    }
> 

                    <i className="bi bi-people-fill"></i>

                    Profiles

                </NavLink>

                <NavLink

                    to="/admin/reports"

                    onClick={closeSidebar}

                    className={({ isActive }) =>

                        isActive

                            ? "admin-nav-link active"

                            : "admin-nav-link"

                    }

                >

                    <i className="bi bi-bar-chart-fill"></i>

                    Reports

                </NavLink>

            </nav>

            {/* Logout */}

            <button

                className="admin-logout-btn"

                onClick={handleLogout}

            >

                <i className="bi bi-box-arrow-right"></i>

                Logout

            </button>

        </aside>

    );

}

export default AdminSidebar;