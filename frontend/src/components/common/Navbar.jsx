import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// CSS
import "../../assets/css/common/Navbar.css";

// Logo
import logo from "../../assets/images/logo.png";

// ============================
// Navigation Links Data
// ============================
const NAV_LINKS = [
    { name: "Home", path: "/" },
    // { name: "Browse Profiles", path: "/browse-profiles" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" }
];

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // ============================
    // Shadow on scroll
    // ============================
    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 4);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    // ============================
    // Lock body scroll when mobile menu is open
    // ============================
    useEffect(() => {

        document.body.style.overflow = menuOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    const linkClass = (mobile = false) => ({ isActive }) =>
        isActive
            ? `${mobile ? "mobile-link" : "nav-link"} active-link`
            : mobile ? "mobile-link" : "nav-link";

    return (

        <header className={scrolled ? "navbar-container scrolled" : "navbar-container"}>

            <div className="navbar-wrapper">

                {/* Logo */}
                <NavLink to="/" className="logo-container" onClick={closeMenu}>
                    <img src={logo} alt="Vetri Matrimony" className="logo" />
                </NavLink>

                {/* Desktop Menu */}
                <nav className="desktop-menu">
                    {
                        NAV_LINKS.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={linkClass(false)}
                                end={item.path === "/"}
                            >
                                {item.name}
                            </NavLink>
                        ))
                    }
                </nav>

                {/* Right Side */}
                <div className="right-section">

                    <NavLink to="/login" className="login-btn">
                        <span>Login</span>
                        <i className="bi bi-person"></i>
                    </NavLink>

                    <button
                        className={menuOpen ? "menu-btn menu-open" : "menu-btn"}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}
            <nav className={menuOpen ? "mobile-menu show-menu" : "mobile-menu"}>

                {
                    NAV_LINKS.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={linkClass(true)}
                            end={item.path === "/"}
                            onClick={closeMenu}
                        >
                            {item.name}
                        </NavLink>
                    ))
                }

                <NavLink to="/login" className="mobile-login-btn" onClick={closeMenu}>
                    Login
                </NavLink>

            </nav>

            {/* Backdrop */}
            {
                menuOpen &&
                <div className="menu-backdrop" onClick={closeMenu}></div>
            }

        </header>

    );

}

export default Navbar;