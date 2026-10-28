import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/common/Navbar.css";
import logo from "../../assets/images/logo.png";

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Plans", path: "/guest-plans" },
    // { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/guest-contact-us" }
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 4);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            : mobile
                ? "mobile-link"
                : "nav-link";

    return (
        <header className={scrolled ? "navbar-container scrolled" : "navbar-container"}>

            <div className="navbar-wrapper">

                <NavLink to="/" className="logo-container" onClick={closeMenu}>
                    <img src={logo} alt="Anbinai Matrimony" className="logo" />
                </NavLink>

                <nav className="desktop-menu">
                    {NAV_LINKS.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={linkClass(false)}
                            end={item.path === "/"}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="right-section">

                    <NavLink to="/login" className="login-btn-nav">
                        <i className="bi bi-person"></i>
                        <span>Login</span>
                    </NavLink>

                    <NavLink to="/register" className="register-btn">
                        Register
                    </NavLink>

                    <button
                        type="button"
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

            <nav className={menuOpen ? "mobile-menu show-menu" : "mobile-menu"}>

                {NAV_LINKS.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={linkClass(true)}
                        end={item.path === "/"}
                        onClick={closeMenu}
                    >
                        {item.name}
                    </NavLink>
                ))}

                <NavLink
                    to="/login"
                    className="mobile-login-btn-nav"
                    onClick={closeMenu}
                >
                    <i className="bi bi-person"></i>
                    Login
                </NavLink>

                <NavLink
                    to="/register"
                    className="mobile-register-btn"
                    onClick={closeMenu}
                >
                    Register
                </NavLink>

            </nav>

            {menuOpen && (
                <div className="menu-backdrop" onClick={closeMenu}></div>
            )}

        </header>
    );
}

export default Navbar;