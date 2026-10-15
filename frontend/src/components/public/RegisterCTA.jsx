import "../../assets/css/public/RegisterCTA.css";
import { Link } from "react-router-dom";

function RegisterCTA() {
    return (
        <section className="register-cta-section">
            <div className="register-cta-box">
                <div className="register-cta-content">
                    <div className="register-cta-icon">
                        <i className="bi bi-person-vcard"></i>
                    </div>
                    <div className="register-cta-copy">
                        <h3 className="register-cta-title">
                            Create Your Matrimonial Profile
                        </h3>
                        <p className="register-cta-description">
                            Register online and create your matrimonial profile to discover suitable matches and connect with the right partner.
                        </p>
                    </div>
                </div>
                <div className="register-cta-action">
                    <Link
                        to="/register"
                        className="register-cta-button"
                    >
                        REGISTER NOW
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                    <small className="register-cta-note">
                        Create your profile online in a few simple steps
                    </small>
                </div>
            </div>
        </section>
    );
}

export default RegisterCTA;