import { useState } from "react";

import "../../../assets/css/user/profile/header.css";

// Default Image
import defaultProfile from "../../../assets/images/default-profile.png";

function ProfileHeader({ profile }) {

    // ==========================
    // Lightbox State
    // ==========================

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // ==========================
    // Build Full Photo List
    // (Main photo + additional photos)
    // ==========================

    const allPhotos = profile.profilePhoto
        ? [profile.profilePhoto, ...(profile.additionalPhotos || [])]
        : (profile.additionalPhotos || []);

    const visibleThumbs = allPhotos.slice(0, 5);
    const extraCount = allPhotos.length - 5;

    // ==========================
    // Handlers
    // ==========================

    const openLightbox = (index) => {
        setActiveIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
    };

    const showNext = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
    };

    return (

        <div className="profile-header">

            {/* Left Image */}
            <div className="profile-main-image">
                <img
                    src={allPhotos[activeIndex] || defaultProfile}
                    alt={profile.fullName}
                    onClick={() => openLightbox(activeIndex)}
                />
                <div className="profile-id">
                    {profile.profileId}
                </div>
            </div>

            {/* Right Side */}
            <div className="profile-header-right">

                {/* Name */}
                <h1>
                    {profile.fullName}
                </h1>

                {/* Basic Details */}
                <div className="profile-basic-details">
                    <span>{profile.age} Years</span>
                    <span>•</span>
                    <span>{profile.maritalStatus}</span>
                    <span>•</span>
                    <span>{profile.religion}</span>
                    <span> - </span>
                    <span>{profile.caste}</span>
                </div>

                {/* Location */}
                <p className="profile-location">
                    {profile.district}, {profile.state}, {profile.country}
                </p>

                {/* Photo Gallery */}
                <div className="profile-gallery">

                    {
                        visibleThumbs.map((photo, index) => (
                            <div
                                key={index}
                                className={
                                    index === activeIndex
                                        ? "gallery-thumb active-thumb"
                                        : "gallery-thumb"
                                }
                                onClick={() => setActiveIndex(index)}
                            >
                                <img
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                />
                            </div>
                        ))
                    }

                    {
                        extraCount > 0 &&
                        <div
                            className="gallery-more"
                            onClick={() => openLightbox(5)}
                        >
                            <span className="more-count">+{extraCount}</span>
                            <span className="more-label">More Photos</span>
                        </div>
                    }

                </div>

            </div>

            {/* Lightbox */}
            {
                lightboxOpen &&
                <div className="photo-lightbox" onClick={closeLightbox}>

                    <button className="lightbox-close" onClick={closeLightbox}>
                        <i className="bi bi-x-lg"></i>
                    </button>

                    {
                        allPhotos.length > 1 &&
                        <button className="lightbox-nav lightbox-prev" onClick={showPrev}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    }

                    <img
                        src={allPhotos[activeIndex]}
                        alt={profile.fullName}
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {
                        allPhotos.length > 1 &&
                        <button className="lightbox-nav lightbox-next" onClick={showNext}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    }

                    <div className="lightbox-counter">
                        {activeIndex + 1} / {allPhotos.length}
                    </div>

                </div>
            }

        </div>

    );

}

export default ProfileHeader;