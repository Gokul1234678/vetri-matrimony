import ProfileSection from "./ProfileSection";

import "../../../assets/css/user/profile/contact.css";

function ContactInformation({
    profile,
    title = "Contact Information",
    subtitle = "You can contact this member directly",
    showUnlockNotice = true
}) {

    return (

       <ProfileSection
    title={title}
    icon="bi bi-telephone-fill"
    color="gold"
    subtitle={subtitle}
>

            <div className="contact-boxes">

                <div className="contact-box">
                    <div className="contact-box-icon">
                        <i className="bi bi-telephone-fill"></i>
                    </div>
                    <div>
                        <p className="contact-label">Mobile Number</p>
                        <p className="contact-value">{profile.mobileNumber || "-"}</p>
                    </div>
                </div>

                <div className="contact-box">
                    <div className="contact-box-icon whatsapp-icon">
                        <i className="bi bi-whatsapp"></i>
                    </div>
                    <div>
                        <p className="contact-label">WhatsApp Number</p>
                        <p className="contact-value">{profile.whatsappNumber || "-"}</p>
                    </div>
                </div>

            </div>

            {
    showUnlockNotice && profile.unlockedDate &&
    <div className="unlock-notice">
        <i className="bi bi-unlock-fill"></i>
        This profile has been unlocked using 1 credit on {profile.unlockedDate}.
    </div>
}

        </ProfileSection>

    );

}

export default ContactInformation;