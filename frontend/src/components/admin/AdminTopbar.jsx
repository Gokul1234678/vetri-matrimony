import "../../assets/css/admin/topbar.css";

import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminTopbar({

    sidebarOpen,

    setSidebarOpen

}) {

    const { user } = useAuth();

    const location = useLocation();

    const getPageTitle = () => {

        switch (location.pathname) {

            case "/admin/dashboard":
                return "Dashboard";

            case "/admin/profiles/create":
                return "Create Profile";

            case "/admin/profiles":
                return "Profiles";

            case "/admin/reports":
                return "Reports";

            default:
                return "Admin Panel";

        }

    };

    const today = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    return (

        <header className="admin-topbar">

            <div className="topbar-left">

                {
                    !sidebarOpen && (

                        <button
                            className="menu-btn"
                            onClick={() => setSidebarOpen(true)}
                        >

                            <i className="bi bi-list"></i>

                        </button>

                    )
                }

                <div>

                    <h2>{getPageTitle()}</h2>

                    <p>{today}</p>

                </div>

            </div>

            <div className="topbar-right">

                <div className="admin-user">

                    <div className="admin-avatar">

                        <i className="bi bi-person-fill"></i>

                    </div>

                    <div>

                        <h5>{user?.username || "Admin"}</h5>

                        <span>Administrator</span>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default AdminTopbar;