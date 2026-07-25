import { Link } from "react-router-dom";

import ProfileSection from "./profile/ProfileSection";

import "../../assets/css/user/profileChangesNotice.css";

function ProfileChangesNotice() {

    return (

        <ProfileSection
            title="Need Profile Changes?"
            icon="bi bi-pencil-square"
            color="gold"
            subtitle="Contact our office to update your profile information."
        >

            <div className="profile-changes-notice">

                <p>
                    Profile information can only be updated by the Vetri
                    Matrimony office after verification.
                </p>

                <ul>

                    <li>Update personal details</li>

                    <li>Change partner expectations</li>

                    <li>Replace profile or horoscope photos</li>

                    <li>Update contact information</li>

                </ul>

                <div className="notice-box">

                    <i className="bi bi-info-circle-fill"></i>

                    <span>
                        Visit our office or contact the administrator to
                        request any profile changes.
                    </span>

                </div>

                <Link
                    to="/contact-us"
                    className="contact-admin-btn"
                >

                    <i className="bi bi-headset"></i>

                    Contact Us

                </Link>

            </div>

        </ProfileSection>

    );

}

export default ProfileChangesNotice;