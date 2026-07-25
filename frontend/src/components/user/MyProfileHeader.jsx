import { useState, useEffect } from "react";
import "../../assets/css/user/myProfileHeader.css";

import defaultProfile from "../../assets/images/default-profile.png";

function MyProfileHeader({ profile }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // ==========================================
    // Loading States
    // ==========================================
    const [mainLoaded, setMainLoaded] = useState(false);
    const [thumbLoaded, setThumbLoaded] = useState({});
    const [lightboxLoaded, setLightboxLoaded] = useState(false);

    const allPhotos = profile.profilePhoto
        ? [profile.profilePhoto, ...(profile.additionalPhotos || [])]
        : (profile.additionalPhotos || []);

    const visibleThumbs = allPhotos.slice(0, 5);
    const extraCount = allPhotos.length - 5;

    // Reset the main image's loading state whenever the
    // active photo changes (clicking a thumbnail, etc.)
    useEffect(() => {
        setMainLoaded(false);
    }, [activeIndex]);

    // ==========================================
    // Catches images that finish loading (from
    // browser cache) before onLoad gets attached —
    // this is why it "sometimes" got stuck.
    // ==========================================
    const checkAlreadyLoaded = (el, markFn, isLoaded) => {
        if (el && !isLoaded && el.complete && el.naturalWidth > 0) {
            markFn();
        }
    };

    const openLightbox = (index) => {
        setActiveIndex(index);
        setLightboxLoaded(false);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        setLightboxLoaded(false);
        setActiveIndex((prev) =>
            prev === 0 ? allPhotos.length - 1 : prev - 1
        );
    };

    const showNext = (e) => {
        e.stopPropagation();
        setLightboxLoaded(false);
        setActiveIndex((prev) =>
            prev === allPhotos.length - 1 ? 0 : prev + 1
        );
    };

    const markThumbLoaded = (index) => {
        setThumbLoaded((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <div className="my-profile-header">

            <div className="my-profile-main-image">

                {
                    !mainLoaded &&
                    <div className="img-skeleton"></div>
                }

                <img
                    ref={(el) => checkAlreadyLoaded(el, () => setMainLoaded(true), mainLoaded)}
                    src={allPhotos[activeIndex] || defaultProfile}
                    alt={profile.fullName}
                    className={mainLoaded ? "loaded" : ""}
                    onLoad={() => setMainLoaded(true)}
                    onError={() => setMainLoaded(true)}
                    onClick={() => openLightbox(activeIndex)}
                />

            </div>

            <div className="my-profile-gallery-section">
                <h3>Photo Gallery</h3>

                <div className="my-profile-gallery">
                    {visibleThumbs.map((photo, index) => (
                        <div
                            key={index}
                            className={
                                index === activeIndex
                                    ? "gallery-thumb active-thumb"
                                    : "gallery-thumb"
                            }
                            onClick={() => setActiveIndex(index)}
                        >

                            {
                                !thumbLoaded[index] &&
                                <div className="img-skeleton"></div>
                            }

                            <img
                                ref={(el) => checkAlreadyLoaded(el, () => markThumbLoaded(index), !!thumbLoaded[index])}
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className={thumbLoaded[index] ? "loaded" : ""}
                                onLoad={() => markThumbLoaded(index)}
                                onError={() => markThumbLoaded(index)}
                            />

                        </div>
                    ))}

                    {extraCount > 0 && (
                        <div
                            className="gallery-more"
                            onClick={() => openLightbox(5)}
                        >
                            <span className="more-count">
                                +{extraCount}
                            </span>

                            <span className="more-label">
                                More Photos
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {lightboxOpen && (
                <div
                    className="photo-lightbox"
                    onClick={closeLightbox}
                >
                    <button
                        className="lightbox-close"
                        onClick={closeLightbox}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                    {allPhotos.length > 1 && (
                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={showPrev}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    )}

                    {
                        !lightboxLoaded &&
                        <div className="lightbox-spinner"></div>
                    }

                    <img
                        ref={(el) => checkAlreadyLoaded(el, () => setLightboxLoaded(true), lightboxLoaded)}
                        src={allPhotos[activeIndex]}
                        alt={profile.fullName}
                        className={
                            lightboxLoaded
                                ? "lightbox-image loaded"
                                : "lightbox-image"
                        }
                        onLoad={() => setLightboxLoaded(true)}
                        onError={() => setLightboxLoaded(true)}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {allPhotos.length > 1 && (
                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={showNext}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    )}

                    <div className="lightbox-counter">
                        {activeIndex + 1} / {allPhotos.length}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyProfileHeader;