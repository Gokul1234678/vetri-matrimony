import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

import "../../assets/css/admin/view-profile.css";

function ViewProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================================
    // Lightbox State
    // =========================================
    const [lightbox, setLightbox] = useState({
        open: false,
        images: [],
        index: 0,
    });

    const openLightbox = (images, index) => {
        setLightbox({ open: true, images, index });
    };

    const closeLightbox = () => {
        setLightbox((prev) => ({ ...prev, open: false }));
    };

    const lightboxPrev = (e) => {
        e.stopPropagation();
        setLightbox((prev) => ({
            ...prev,
            index:
                prev.index === 0
                    ? prev.images.length - 1
                    : prev.index - 1,
        }));
    };

    const lightboxNext = (e) => {
        e.stopPropagation();
        setLightbox((prev) => ({
            ...prev,
            index:
                prev.index === prev.images.length - 1
                    ? 0
                    : prev.index + 1,
        }));
    };

    // =========================================
    // Keyboard navigation
    // =========================================
    useEffect(() => {
        if (!lightbox.open) return;
        const handleKey = (e) => {
            if (e.key === "ArrowRight") lightboxNext(e);
            if (e.key === "ArrowLeft") lightboxPrev(e);
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightbox.open, lightbox.index]);

    // =========================================
    // Fetch Profile
    // =========================================
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/admin/profiles/${id}`);
            const data = response.data;
            if (!data.success) {
                throw new Error(data.message || "Failed to load profile");
            }
            setProfile(data.profile);
        } catch (error) {
            console.error("Fetch Profile Error:", error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load profile"
            );
            navigate("/admin/profiles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [id]);

    // =========================================
    // Build gallery array
    // =========================================
    const galleryImages = profile
        ? [
              ...(profile.profilePhoto ? [profile.profilePhoto] : []),
              ...(profile.additionalPhotos || []),
          ]
        : [];

    return (
        <AdminLayout>

            <div className="view-profile-page">

                {loading ? (

                    <div className="view-profile-loading">
                        <div className="view-profile-spinner"></div>
                        <p>Loading profile...</p>
                    </div>

                ) : profile ? (

                    <>

                        {/* =====================
                            Header
                        ===================== */}

                        <div className="view-profile-header">

                            <button
                                type="button"
                                className="back-profiles-btn"
                                onClick={() => navigate("/admin/profiles")}
                            >
                                <i className="bi bi-arrow-left"></i>
                                Back to Profiles
                            </button>

                            <div className="view-profile-title">

                                <div>
                                    <h1>View Profile</h1>
                                    <p>Profile details and information</p>
                                </div>

                                <div className="view-profile-actions">
                                    <button
                                        type="button"
                                        className="view-edit-btn"
                                        onClick={() => {}}
                                    >
                                        <i className="bi bi-pencil"></i>
                                        Edit Profile
                                    </button>
                                </div>

                            </div>

                        </div>

                        {/* =====================
                            Profile Overview
                        ===================== */}

                        <section className="view-profile-overview">

                            <div
                                className="view-profile-photo"
                                onClick={() =>
                                    profile.profilePhoto &&
                                    openLightbox([profile.profilePhoto], 0)
                                }
                                title="Click to enlarge"
                            >
                                <img
                                    src={profile.profilePhoto}
                                    alt={profile.fullName}
                                />
                                <div className="photo-zoom-hint">
                                    <i className="bi bi-zoom-in"></i>
                                </div>
                            </div>

                            <div className="view-profile-main-info">

                                <div className="view-profile-id">
                                    {profile.profileId}
                                </div>

                                <h2>{profile.fullName}</h2>

                                <div className="view-profile-meta">

                                    <span>
                                        <i className="bi bi-gender-ambiguous"></i>
                                        {profile.gender}
                                    </span>

                                    <span>
                                        <i className="bi bi-coin"></i>
                                        {profile.credits} Credits
                                    </span>

                                    <span
                                        className={`view-status ${
                                            profile.status === "active"
                                                ? "active"
                                                : "inactive"
                                        }`}
                                    >
                                        <span className="status-dot"></span>
                                        {profile.status}
                                    </span>

                                </div>

                            </div>

                        </section>

                        {/* =====================
                            Info Sections
                        ===================== */}

                        <ProfileSection title="Basic Information" icon="bi-person">
                            <InfoItem label="Full Name" value={profile.fullName} />
                            <InfoItem label="Gender" value={profile.gender} />
                            <InfoItem label="Date of Birth" value={formatDate(profile.dateOfBirth)} />
                            <InfoItem label="Age" value={profile.age} />
                            <InfoItem label="Mobile Number" value={profile.mobileNumber} />
                            <InfoItem label="WhatsApp Number" value={profile.whatsappNumber} />
                        </ProfileSection>

                        <ProfileSection title="Personal Information" icon="bi-person-vcard">
                            <InfoItem label="Height" value={profile.height} />
                            <InfoItem label="Weight" value={profile.weight} />
                            <InfoItem label="Marital Status" value={profile.maritalStatus} />
                            <InfoItem label="Religion" value={profile.religion} />
                            <InfoItem label="Caste" value={profile.caste} />
                            <InfoItem label="Sub Caste" value={profile.subCaste} />
                            <InfoItem label="Mother Tongue" value={profile.motherTongue} />
                        </ProfileSection>

                        <ProfileSection title="Location Information" icon="bi-geo-alt">
                            <InfoItem label="Country" value={profile.country} />
                            <InfoItem label="State" value={profile.state} />
                            <InfoItem label="District" value={profile.district} />
                            <InfoItem label="Address" value={profile.address} fullWidth />
                        </ProfileSection>

                        <ProfileSection title="Education & Career" icon="bi-briefcase">
                            <InfoItem label="Qualification" value={profile.qualification} />
                            <InfoItem label="Occupation" value={profile.occupation} />
                            <InfoItem label="Company" value={profile.companyName} />
                            <InfoItem label="Annual Income" value={profile.annualIncome} />
                        </ProfileSection>

                        <ProfileSection title="Family Information" icon="bi-people">
                            <InfoItem label="Father's Name" value={profile.fatherName} />
                            <InfoItem label="Father's Occupation" value={profile.fatherOccupation} />
                            <InfoItem label="Mother's Name" value={profile.motherName} />
                            <InfoItem label="Mother's Occupation" value={profile.motherOccupation} />
                            <InfoItem label="Brothers" value={profile.brothers} />
                            <InfoItem label="Sisters" value={profile.sisters} />
                        </ProfileSection>

                        <ProfileSection title="Lifestyle" icon="bi-heart">
                            <InfoItem label="Eating Habit" value={profile.eatingHabit} />
                            <InfoItem label="Smoking" value={profile.smokingHabit} />
                            <InfoItem label="Drinking" value={profile.drinkingHabit} />
                        </ProfileSection>

                        <ProfileSection title="About Me" icon="bi-chat-left-text">
                            <div className="profile-about">
                                {profile.aboutMe || "Not provided"}
                            </div>
                        </ProfileSection>

                        <ProfileSection title="Partner Expectations" icon="bi-heart">
                            <InfoItem label="Preferred Age" value={profile.partnerExpectations?.preferredAge} />
                            <InfoItem label="Preferred Education" value={profile.partnerExpectations?.preferredEducation} />
                            <InfoItem label="Preferred Location" value={profile.partnerExpectations?.preferredLocation} />
                            <InfoItem label="Preferred Religion" value={profile.partnerExpectations?.preferredReligion} />
                            <InfoItem label="Preferred Caste" value={profile.partnerExpectations?.preferredCaste} />
                        </ProfileSection>

                        <ProfileSection title="Account Information" icon="bi-person-lock">
                            <InfoItem label="User ID" value={profile.userId?._id} />
                            <InfoItem label="Username" value={profile.userId?.username} />
                            <InfoItem label="Role" value={profile.userId?.role} />
                            <InfoItem label="User Created At" value={formatDate(profile.userId?.createdAt)} />
                        </ProfileSection>

                        <ProfileSection title="Credit Summary" icon="bi-coin">
                            <InfoItem label="Total Credits" value={profile.totalCredits} />
                            <InfoItem label="Credits Used" value={Math.max(0, (profile.totalCredits || 0) - (profile.credits || 0))} />
                            <InfoItem label="Remaining Credits" value={profile.credits} />
                        </ProfileSection>

                        <ProfileSection title="Profile Information" icon="bi-info-circle">
                            <InfoItem label="Profile Created At" value={formatDate(profile.createdAt)} />
                            <InfoItem label="Last Updated At" value={formatDate(profile.updatedAt)} />
                        </ProfileSection>

                        {/* =====================
                            Photos Gallery
                        ===================== */}

                        <ProfileSection title="Photos" icon="bi-images">
                            <div className="profile-gallery">
                                {galleryImages.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="gallery-item"
                                        onClick={() => openLightbox(galleryImages, index)}
                                    >
                                        <img src={photo} alt={`Photo ${index + 1}`} />
                                        <div className="gallery-item-overlay">
                                            <i className="bi bi-zoom-in"></i>
                                        </div>
                                    </div>
                                ))}
                                {galleryImages.length === 0 && (
                                    <p className="no-photos">No photos uploaded.</p>
                                )}
                            </div>
                        </ProfileSection>

                        {/* =====================
                            Horoscope
                        ===================== */}

                        {profile.horoscopeImage && (
                            <ProfileSection title="Horoscope" icon="bi-file-earmark-image">
                                <div
                                    className="horoscope-image-wrapper"
                                    onClick={() =>
                                        openLightbox([profile.horoscopeImage], 0)
                                    }
                                    title="Click to enlarge"
                                >
                                    <img
                                        src={profile.horoscopeImage}
                                        alt="Horoscope"
                                    />
                                    <div className="gallery-item-overlay">
                                        <i className="bi bi-zoom-in"></i>
                                    </div>
                                </div>
                            </ProfileSection>
                        )}

                    </>

                ) : null}

            </div>

            {/* =====================
                LIGHTBOX
            ===================== */}

            {lightbox.open && (
                <div
                    className="vp-lightbox"
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <button
                        className="vp-lb-close"
                        onClick={closeLightbox}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                    {/* Prev */}
                    {lightbox.images.length > 1 && (
                        <button
                            className="vp-lb-nav vp-lb-prev"
                            onClick={lightboxPrev}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    )}

                    {/* Image */}
                    <img
                        src={lightbox.images[lightbox.index]}
                        alt={`Photo ${lightbox.index + 1}`}
                        className="vp-lb-image"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Next */}
                    {lightbox.images.length > 1 && (
                        <button
                            className="vp-lb-nav vp-lb-next"
                            onClick={lightboxNext}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    )}

                    {/* Counter */}
                    {lightbox.images.length > 1 && (
                        <div className="vp-lb-counter">
                            {lightbox.index + 1} / {lightbox.images.length}
                        </div>
                    )}
                </div>
            )}

        </AdminLayout>
    );
}

// =========================================
// Profile Section
// =========================================

function ProfileSection({ title, icon, children }) {
    return (
        <section className="view-profile-section">
            <div className="view-profile-section-header">
                <h2>
                    <i className={`bi ${icon}`}></i>
                    {title}
                </h2>
            </div>
            <div className="view-profile-section-body">
                <div className="profile-info-grid">
                    {children}
                </div>
            </div>
        </section>
    );
}

// =========================================
// Info Item
// =========================================

function InfoItem({ label, value, fullWidth = false }) {
    return (
        <div className={`profile-info-item ${fullWidth ? "full-width" : ""}`}>
            <span className="profile-info-label">{label}</span>
            <span className="profile-info-value">{value || "Not provided"}</span>
        </div>
    );
}

// =========================================
// Date Formatter
// =========================================

function formatDate(date) {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default ViewProfile;