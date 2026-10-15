import { useState } from "react";
import ProfileSection from "./ProfileSection";
import "../../../assets/css/user/profile/horoscope.css";

function HoroscopeInformation({ profile }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!profile.horoscopeImage) {
        return null;
    }

    return (
        <ProfileSection
            title="Horoscope"
            icon="bi bi-stars"
            color="orange"
        >
            <div className="horoscope-container">
                <img
                    src={profile.horoscopeImage}
                    alt="Horoscope"
                    className="horoscope-image"
                    onClick={() => setLightboxOpen(true)}
                />
            </div>

            {lightboxOpen && (
                <div
                    className="photo-lightbox"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        className="lightbox-close"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                    <img
                        src={profile.horoscopeImage}
                        alt="Horoscope"
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </ProfileSection>
    );
}

export default HoroscopeInformation;