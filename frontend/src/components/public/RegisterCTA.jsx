import "../../assets/css/public/RegisterCTA.css";
import { SITE_CONFIG } from "../../config/siteConfig";

function RegisterCTA() {

    return (

        <section className="register-cta">

            <div className="register-box">

                {/* Left */}

                <div className="register-left">

                    <div className="register-icon">

                        <i className="bi bi-person-vcard"></i>

                    </div>

                    <div>

                        <h3>
                            Want to see full profile details?
                        </h3>

                        <p>
                            Please visit our office and register with us to view complete details and contact information.
                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="register-right">

                    <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="register-btn"
                    >
                        REGISTER NOW

                        <i className="bi bi-arrow-right ms-2"></i>

                    </a>

                    <small>
                        or visit our office to register
                    </small>

                </div>

            </div>

        </section>

    );

}

export default RegisterCTA;