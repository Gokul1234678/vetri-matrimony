import { useState } from "react";

import ProfileSection from "./ProfileSection";

import "../../../assets/css/user/profile/horoscope.css";

import defaultHoroscope from "../../../assets/images/default-horoscope.jpg";

function HoroscopeInformation({ profile }) {

    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (

        <ProfileSection
            title="Horoscope"
            icon="bi bi-stars"
            color="orange"
        >

            <div className="horoscope-container">

                <img
                    src={profile.horoscopePhoto || defaultHoroscope}
                    alt="Horoscope"
                    className="horoscope-image"
                    onClick={() => setLightboxOpen(true)}
                />

            </div>

            {/* Lightbox */}
            {
                lightboxOpen &&
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
                        src={profile.horoscopePhoto || defaultHoroscope}
                        alt="Horoscope"
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />

                </div>
            }

        </ProfileSection>

    );

}

export default HoroscopeInformation;