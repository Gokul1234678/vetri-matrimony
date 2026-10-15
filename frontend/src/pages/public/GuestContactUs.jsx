import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SITE_CONFIG } from "../../config/siteConfig";
import "../../assets/css/contactUs.css";
import contactBanner from "../../assets/images/couple-photo.png";

function GuestContactUs() {
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`;

    return (
        <>
            <Navbar />
            <main className="contact-page">
                <section className="contact-hero">
                    <div className="container">
                        <div className="contact-hero-content">
                            <div className="contact-left">
                                <div className="section-decoration">
                                    <span></span>
                                    <i className="bi bi-heart"></i>
                                    <span></span>
                                </div>
                                <h1>Contact Us</h1>
                                <p>
                                    Have questions about registration, finding suitable matches,
                                    or using Vetri Matrimony? Our team is here to help.
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
                <section className="contact-details">
                    <div className="container">
                        <div className="contact-grid">
                            <div className="contact-card">
                                <div className="icon brown">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </div>
                                <div>
                                    <h3>Office Address</h3>
                                    <p>
                                        <strong>{SITE_CONFIG.companyName}</strong>
                                        <br />
                                        {SITE_CONFIG.address}
                                        <br />
                                        {SITE_CONFIG.district}, {SITE_CONFIG.state}
                                        <br />
                                        {SITE_CONFIG.country}
                                    </p>
                                </div>
                            </div>
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="contact-card"
                            >
                                <div className="icon gold">
                                    <i className="bi bi-telephone-fill"></i>
                                </div>
                                <div>
                                    <h3>Phone</h3>
                                    <p>{SITE_CONFIG.phone}</p>
                                </div>
                            </a>
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
                                    <p>{SITE_CONFIG.whatsapp}</p>
                                </div>
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="contact-card"
                            >
                                <div className="icon gold">
                                    <i className="bi bi-envelope-fill"></i>
                                </div>
                                <div>
                                    <h3>Email</h3>
                                    <p>{SITE_CONFIG.email}</p>
                                </div>
                            </a>
                            <div className="contact-card">
                                <div className="icon brown">
                                    <i className="bi bi-clock-history"></i>
                                </div>
                                <div>
                                    <h3>Office Hours</h3>
                                    <p>{SITE_CONFIG.officeHours}</p>
                                </div>
                            </div>
                            <div className="contact-card">
                                <div className="icon gold">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <div>
                                    <h3>We're Here To Help</h3>
                                    <p>
                                        Our friendly support team is always ready to assist you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact-help">
                    <div className="container">
                        <div className="section-title">
                            <h2>How Can We Help?</h2>
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
                                    Register and create a new matrimonial profile.
                                </p>
                            </div>
                            <div className="help-item">
                                <div className="help-icon">
                                    <i className="bi bi-search-heart-fill"></i>
                                </div>
                                <p>
                                    Browse profiles and find suitable matches.
                                </p>
                            </div>
                            <div className="help-item">
                                <div className="help-icon">
                                    <i className="bi bi-unlock-fill"></i>
                                </div>
                                <p>
                                    Learn how profile contact details can be unlocked.
                                </p>
                            </div>
                            <div className="help-item">
                                <div className="help-icon">
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                <p>
                                    Get help with your matrimonial profile.
                                </p>
                            </div>
                            <div className="help-item">
                                <div className="help-icon">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <p>
                                    Get assistance with your account and matrimony enquiries.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact-cta">
                    <div className="container">
                        <div className="cta-box">
                            <div className="cta-left">
                                <div className="cta-icon">
                                    <i className="bi bi-telephone-forward-fill"></i>
                                </div>
                                <div>
                                    <h3>Still need help?</h3>
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

export default GuestContactUs;