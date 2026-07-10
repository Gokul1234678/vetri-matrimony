import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../../assets/css/common/UserNavbar.css";

import logo from "../../assets/images/logo.png";

const USER_NAV_LINKS = [

    {
        name: "Home",
        path: "/user/dashboard"
    },

    {
        name: "Browse Profiles",
        path: "/browse-profiles"
    },

    {
        name: "Unlocked Profiles",
        path: "/user/unlocked-profiles"
    },

    {
        name: "My Profile",
        path: "/user/profile"
    }

];

function UserNavbar() {

    const {

        user,

        logout

    } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    // ==================================
    // Navbar Shadow
    // ==================================

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 4);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    // ==================================
    // Lock Body Scroll
    // ==================================

    useEffect(() => {

        document.body.style.overflow =

            menuOpen ? "hidden" : "auto";

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [menuOpen]);

    const closeMenu = () => {

        setMenuOpen(false);

        setDropdownOpen(false);

    };

    const handleLogout = async () => {

        await logout();

        window.location.href = "/";

    };

    const linkClass = (mobile = false) => ({ isActive }) =>

        isActive

            ? `${mobile ? "user-mobile-link" : "user-nav-link"} active-link`

            : mobile

                ? "user-mobile-link"

                : "user-nav-link";

    return (

        <header className={

            scrolled

                ? "user-navbar scrolled"

                : "user-navbar"

        }>

            <div className="user-navbar-wrapper">

                {/* Logo */}

                <NavLink

                    to="/user/dashboard"

                    className="user-logo"

                >

                    <img

                        src={logo}

                        alt="Logo"

                    />

                </NavLink>

                {/* Desktop Menu */}

                <nav className="user-desktop-menu">

                    {

                        USER_NAV_LINKS.map((item) => (

                            <NavLink

                                key={item.name}

                                to={item.path}

                                className={linkClass(false)}

                            >

                                {item.name}

                            </NavLink>

                        ))

                    }

                </nav>
                                {/* Right Section */}

                <div className="user-right-section">

                    {/* Credits */}

                    <div className="credits-card">

                        <small>

                            Credits

                        </small>

                        <h5>

                            {user?.credits ?? 0}

                        </h5>

                    </div>

                    {/* User Dropdown */}

                    <div className="user-dropdown">

                        <button

                            className="user-dropdown-btn"

                            onClick={() =>

                                setDropdownOpen(!dropdownOpen)

                            }

                        >

                            <i className="bi bi-person-circle"></i>

                            <span>

                                {user?.username || "User"}

                            </span>

                            <i className="bi bi-chevron-down"></i>

                        </button>

                        {

                            dropdownOpen &&

                            <div className="dropdown-menu-box">

                                <NavLink

                                    to="/user/profile"

                                    onClick={closeMenu}

                                >

                                    <i className="bi bi-person"></i>

                                    My Profile

                                </NavLink>

                                <button

                                    onClick={handleLogout}

                                >

                                    <i className="bi bi-box-arrow-right"></i>

                                    Logout

                                </button>

                            </div>

                        }

                    </div>

                    {/* Mobile Menu Button */}

                    <button

                        className={

                            menuOpen

                                ? "user-menu-btn open"

                                : "user-menu-btn"

                        }

                        onClick={() =>

                            setMenuOpen(!menuOpen)

                        }

                    >

                        <span></span>

                        <span></span>

                        <span></span>

                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            <nav

                className={

                    menuOpen

                        ? "user-mobile-menu show"

                        : "user-mobile-menu"

                }

            >

                {

                    USER_NAV_LINKS.map((item) => (

                        <NavLink

                            key={item.name}

                            to={item.path}

                            className={linkClass(true)}

                            onClick={closeMenu}

                        >

                            {item.name}

                        </NavLink>

                    ))

                }

                <div className="mobile-credits">

                    Credits :

                    <strong>

                        {user?.credits ?? 0}

                    </strong>

                </div>

                <button

                    className="mobile-logout-btn"

                    onClick={handleLogout}

                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </nav>

            {

                menuOpen &&

                <div

                    className="user-backdrop"

                    onClick={closeMenu}

                ></div>

            }

        </header>

    );

}

export default UserNavbar;