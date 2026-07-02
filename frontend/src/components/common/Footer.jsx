import { NavLink } from "react-router-dom";

import "../../assets/css/common/Footer.css";

import logo from "../../assets/images/logo.png";

import { SITE_CONFIG } from "../../config/siteConfig";
import { NAV_LINKS } from "../../config/navigation";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-container">

                {/* ===========================
                    Company
                =========================== */}

                <div className="footer-column">

                    <img
                        src={logo}
                        alt={SITE_CONFIG.companyName}
                        className="footer-logo"
                    />

                    <p className="footer-description">

                        We help you find the perfect life partner
                        with our trusted and verified profiles.

                    </p>

                    <div className="social-icons">

                        <a
                            href={SITE_CONFIG.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-whatsapp"></i>
                        </a>

                        <a
                            href={SITE_CONFIG.facebook}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a
                            href={SITE_CONFIG.instagram}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>

                            {/* youtube */}
                        {/* <a
                            href={SITE_CONFIG.youtube}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-youtube"></i>
                        </a> */}

                    </div>

                </div>

                {/* ===========================
                    Quick Links
                =========================== */}

                <div className="footer-column">

                    <h4>Quick Links</h4>

                    <ul>

                        {

                            NAV_LINKS.map((item) => (

                                <li key={item.name}>

                                    <NavLink to={item.path}>

                                        {item.name}

                                    </NavLink>

                                </li>

                            ))

                        }

                    </ul>

                </div>

                {/* ===========================
                    Information
                =========================== */}

                <div className="footer-column">

                    <h4>Information</h4>

                    <ul>

                        <li>
                            <NavLink to="/how-it-works">
                                How It Works
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/privacy-policy">
                                Privacy Policy
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/terms">
                                Terms & Conditions
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/faq">
                                FAQ
                            </NavLink>
                        </li>

                    </ul>

                </div>

                {/* ===========================
                    Contact
                =========================== */}

                <div className="footer-column">

                    <h4>Contact Us</h4>

                    <ul className="contact-list">

                        <li>

                            <i className="bi bi-telephone-fill"></i>

                            <span>

                                {SITE_CONFIG.phone}

                            </span>

                        </li>

                        <li>

                            <i className="bi bi-envelope-fill"></i>

                            <span>

                                {SITE_CONFIG.email}

                            </span>

                        </li>

                        <li>

                            <i className="bi bi-geo-alt-fill"></i>

                            <span>

                                {SITE_CONFIG.address}

                            </span>

                        </li>

                    </ul>

                </div>

            </div>

            {/* Copyright */}

            <div className="footer-bottom">

                © {new Date().getFullYear()} {SITE_CONFIG.companyName}. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;