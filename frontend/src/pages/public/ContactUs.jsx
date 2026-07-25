import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

import { SITE_CONFIG } from "../../config/siteConfig";

import "../../assets/css/contactUs.css";

import contactBanner from "../../assets/images/couple-photo.png";

function ContactUs() {

    const whatsappUrl =
        `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`;

    return (

        <>

            <UserNavbar />

            <main className="contact-page">

                {/* ================= HERO ================= */}

                <section className="contact-hero">

                    <div className="container">

                        <div className="contact-hero-content">

                            <div className="contact-left">

                                <div className="section-decoration">

                                    <span></span>

                                    <i className="bi bi-heart"></i>

                                    <span></span>

                                </div>

                                <h1>
                                    Contact Us
                                </h1>

                                <p>

                                    Whether you're planning to register,
                                    update your profile,
                                    recharge your credits,
                                    or need any assistance,
                                    our team is here to help.

                                </p>

                            </div>

                            <div className="contact-right">

                                <img
                                    src={contactBanner}
                                    alt="Vetri Matrimony"
                                />

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= CONTACT CARDS ================= */}

                <section className="contact-details">

                    <div className="container">

                        <div className="contact-grid">

                            {/* Address */}

                            <div className="contact-card">

                                <div className="icon brown">

                                    <i className="bi bi-geo-alt-fill"></i>

                                </div>

                                <div>

                                    <h3>Office Address</h3>

                                    <p>

                                        <strong>

                                            {SITE_CONFIG.companyName}

                                        </strong>

                                        <br />

                                        {SITE_CONFIG.address}

                                        <br />

                                        {SITE_CONFIG.district},{" "}

                                        {SITE_CONFIG.state}

                                        <br />

                                        {SITE_CONFIG.country}

                                    </p>

                                </div>

                            </div>

                            {/* Phone */}

                            <a

                                href={`tel:${SITE_CONFIG.phone}`}

                                className="contact-card"

                            >

                                <div className="icon gold">

                                    <i className="bi bi-telephone-fill"></i>

                                </div>

                                <div>

                                    <h3>Phone</h3>

                                    <p>

                                        {SITE_CONFIG.phone}

                                    </p>

                                </div>

                            </a>

                            {/* WhatsApp */}

                            <a

                                href={whatsappUrl}

                                target="_blank"

                                rel="noopener noreferrer"

                                className="contact-card"

                            >

                                <div className="icon green">

                                    <i className="bi bi-whatsapp"></i>

                                </div>

                                <div>

                                    <h3>WhatsApp</h3>

                                    <p>

                                        {SITE_CONFIG.whatsapp}

                                    </p>

                                </div>

                            </a>

                            {/* Email */}

                            <a

                                href={`mailto:${SITE_CONFIG.email}`}

                                className="contact-card"

                            >

                                <div className="icon gold">

                                    <i className="bi bi-envelope-fill"></i>

                                </div>

                                <div>

                                    <h3>Email</h3>

                                    <p>

                                        {SITE_CONFIG.email}

                                    </p>

                                </div>

                            </a>

                            {/* Office Hours */}

                            <div className="contact-card">

                                <div className="icon brown">

                                    <i className="bi bi-clock-history"></i>

                                </div>

                                <div>

                                    <h3>Office Hours</h3>

                                    <p>

                                        {SITE_CONFIG.officeHours}

                                    </p>

                                </div>

                            </div>

                            {/* Support */}

                            <div className="contact-card">

                                <div className="icon gold">

                                    <i className="bi bi-headset"></i>

                                </div>

                                <div>

                                    <h3>We're Here To Help</h3>

                                    <p>

                                        Our friendly support team is
                                        always ready to assist you.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= HOW CAN WE HELP ================= */}

                <section className="contact-help">

                    <div className="container">

                        <div className="section-title">

                            <h2>

                                How Can We Help?

                            </h2>

                            <div className="section-decoration">

                                <span></span>

                                <i className="bi bi-heart"></i>

                                <span></span>

                            </div>

                        </div>

                        <div className="help-grid">

                            <div className="help-item">

                                <div className="help-icon">

                                    <i className="bi bi-person-plus-fill"></i>

                                </div>

                                <p>

                                    Create a new matrimony profile.

                                </p>

                            </div>

                            <div className="help-item">

                                <div className="help-icon">

                                    <i className="bi bi-pencil-square"></i>

                                </div>

                                <p>

                                    Update your existing profile information.

                                </p>

                            </div>

                            <div className="help-item">

                                <div className="help-icon">

                                    <i className="bi bi-credit-card-2-front-fill"></i>

                                </div>

                                <p>

                                    Recharge your profile credits.

                                </p>

                            </div>

                            <div className="help-item">

                                <div className="help-icon">

                                    <i className="bi bi-images"></i>

                                </div>

                                <p>

                                    Replace profile or horoscope photos.

                                </p>

                            </div>

                            <div className="help-item">

                                <div className="help-icon">

                                    <i className="bi bi-chat-dots-fill"></i>

                                </div>

                                <p>

                                    General enquiries and customer support.

                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= CTA ================= */}

                <section className="contact-cta">

                    <div className="container">

                        <div className="cta-box">

                            <div className="cta-left">

                                <div className="cta-icon">

                                    <i className="bi bi-telephone-forward-fill"></i>

                                </div>

                                <div>

                                    <h3>

                                        Still need help?

                                    </h3>

                                    <p>

                                        Reach out to us anytime.

                                        <br />

                                        We're just a call or message away!

                                    </p>

                                </div>

                            </div>

                            <a

                                href={whatsappUrl}

                                target="_blank"

                                rel="noopener noreferrer"

                                className="contact-btn"

                            >

                                Contact Us Now

                            </a>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </>

    );

}

export default ContactUs;