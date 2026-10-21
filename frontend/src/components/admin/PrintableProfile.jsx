import { QRCodeSVG } from "qrcode.react";
import "../../assets/css/admin/printableProfile.css";

function PrintableProfile({ profile }) {
    if (!profile) {
        return null;
    }

    const qrUrl = `https://example.com/profile/${profile.profileId}`;

    const formatDate = (date) => {
        if (!date) {
            return "Not provided";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const displayValue = (value) => {
        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return "Not provided";
        }

        return value;
    };

    const siblings = profile.siblings || {};

    const getSiblingValue = (type, field) => {
        if (siblings[type]?.[field] !== undefined) {
            return siblings[type][field];
        }

        return "0";
    };

    return (
        <div className="print-profile-wrapper">
            <div className="print-profile">

                {/* =========================================
                    PAGE 1 - PROFILE HEADER
                ========================================= */}

                <div className="print-page">

                    <header className="print-header">
                        <div>
                            <h1>Vetri Matrimony</h1>
                            <p>Matrimonial Profile</p>
                        </div>

                        <div className="print-profile-id">
                            {displayValue(profile.profileId)}
                        </div>
                    </header>

                    <div className="print-profile-overview">

                        <div className="print-profile-photo">
                            {profile.profilePhoto ? (
                                <img
                                    src={profile.profilePhoto}
                                    alt={profile.fullName}
                                />
                            ) : (
                                <div className="print-no-image">
                                    No Photo
                                </div>
                            )}
                        </div>

                        <div className="print-profile-main">

                            <h2>
                                {displayValue(profile.fullName)}
                            </h2>

                            <div className="print-profile-summary">
                                <span>
                                    <strong>Gender:</strong>{" "}
                                    {displayValue(profile.gender)}
                                </span>

                                <span>
                                    <strong>Age:</strong>{" "}
                                    {displayValue(profile.age)}
                                </span>

                                <span>
                                    <strong>Status:</strong>{" "}
                                    {displayValue(profile.status)}
                                </span>
                            </div>

                        </div>

                        <div className="print-qr-section">
                            <QRCodeSVG
                                value={qrUrl}
                                size={95}
                                level="M"
                                marginSize={4}
                            />

                            <span>
                                Scan QR
                            </span>
                        </div>

                    </div>

                    {/* =========================================
                        BASIC INFORMATION
                    ========================================= */}

                    <PrintSection title="Basic Information">

                        <PrintItem
                            label="Full Name"
                            value={profile.fullName}
                        />

                        <PrintItem
                            label="Gender"
                            value={profile.gender}
                        />

                        <PrintItem
                            label="Date of Birth"
                            value={formatDate(profile.dateOfBirth)}
                        />

                        <PrintItem
                            label="Age"
                            value={profile.age}
                        />

                        <PrintItem
                            label="Mobile Number"
                            value={profile.mobileNumber}
                        />

                        <PrintItem
                            label="WhatsApp Number"
                            value={profile.whatsappNumber}
                        />

                    </PrintSection>

                    {/* =========================================
                        PERSONAL INFORMATION
                    ========================================= */}

                    <PrintSection title="Personal Information">

                        <PrintItem
                            label="Height"
                            value={profile.height}
                        />

                        <PrintItem
                            label="Weight"
                            value={profile.weight}
                        />

                        <PrintItem
                            label="Marital Status"
                            value={profile.maritalStatus}
                        />

                        <PrintItem
                            label="Religion"
                            value={profile.religion}
                        />

                        <PrintItem
                            label="Caste"
                            value={profile.caste}
                        />

                        <PrintItem
                            label="Sub Caste"
                            value={profile.subCaste}
                        />

                        <PrintItem
                            label="Mother Tongue"
                            value={profile.motherTongue}
                        />

                    </PrintSection>

                    {/* =========================================
                        LOCATION INFORMATION
                    ========================================= */}

                    <PrintSection title="Location Information">

                        <PrintItem
                            label="Country"
                            value={profile.country}
                        />

                        <PrintItem
                            label="State"
                            value={profile.state}
                        />

                        <PrintItem
                            label="District"
                            value={profile.district}
                        />

                        <PrintItem
                            label="Address"
                            value={profile.address}
                            fullWidth
                        />

                    </PrintSection>

                    {/* =========================================
                        EDUCATION & CAREER
                    ========================================= */}

                    <PrintSection title="Education & Career">

                        <PrintItem
                            label="Qualification"
                            value={profile.qualification}
                        />

                        <PrintItem
                            label="Occupation"
                            value={profile.occupation}
                        />

                        <PrintItem
                            label="Company"
                            value={profile.companyName}
                        />

                        <PrintItem
                            label="Annual Income"
                            value={profile.annualIncome}
                        />

                    </PrintSection>

                </div>

                {/* =========================================
                    PAGE 2
                ========================================= */}

                <div className="print-page print-page-break">

                    {/* =========================================
                        FAMILY INFORMATION
                    ========================================= */}

                    <PrintSection title="Family Information">

                        <PrintItem
                            label="Father's Name"
                            value={profile.fatherName}
                        />

                        <PrintItem
                            label="Father's Occupation"
                            value={profile.fatherOccupation}
                        />

                        <PrintItem
                            label="Mother's Name"
                            value={profile.motherName}
                        />

                        <PrintItem
                            label="Mother's Occupation"
                            value={profile.motherOccupation}
                        />

                        <PrintItem
                            label="Elder Brothers"
                            value={getSiblingValue("eb", "total")}
                        />

                        <PrintItem
                            label="Elder Brothers Married"
                            value={getSiblingValue("eb", "married")}
                        />

                        <PrintItem
                            label="Younger Brothers"
                            value={getSiblingValue("yb", "total")}
                        />

                        <PrintItem
                            label="Younger Brothers Married"
                            value={getSiblingValue("yb", "married")}
                        />

                        <PrintItem
                            label="Elder Sisters"
                            value={getSiblingValue("es", "total")}
                        />

                        <PrintItem
                            label="Elder Sisters Married"
                            value={getSiblingValue("es", "married")}
                        />

                        <PrintItem
                            label="Younger Sisters"
                            value={getSiblingValue("ys", "total")}
                        />

                        <PrintItem
                            label="Younger Sisters Married"
                            value={getSiblingValue("ys", "married")}
                        />

                        {!profile.siblings && (
                            <>
                                <PrintItem
                                    label="Brothers"
                                    value={profile.brothers}
                                />

                                <PrintItem
                                    label="Sisters"
                                    value={profile.sisters}
                                />
                            </>
                        )}

                    </PrintSection>

                    {/* =========================================
                        LIFESTYLE
                    ========================================= */}

                    <PrintSection title="Lifestyle">

                        <PrintItem
                            label="Eating Habit"
                            value={profile.eatingHabit}
                        />

                        <PrintItem
                            label="Smoking"
                            value={profile.smokingHabit}
                        />

                        <PrintItem
                            label="Drinking"
                            value={profile.drinkingHabit}
                        />

                    </PrintSection>

                    {/* =========================================
                        ABOUT ME
                    ========================================= */}

                    <PrintSection title="About Me">

                        <div className="print-full-text">
                            {displayValue(profile.aboutMe)}
                        </div>

                    </PrintSection>

                    {/* =========================================
                        PARTNER EXPECTATIONS
                    ========================================= */}

                    <PrintSection title="Partner Expectations">

                        <PrintItem
                            label="Preferred Age"
                            value={
                                profile.partnerExpectations
                                    ?.preferredAge
                            }
                        />

                        <PrintItem
                            label="Preferred Education"
                            value={
                                profile.partnerExpectations
                                    ?.preferredEducation
                            }
                        />

                        <PrintItem
                            label="Preferred Location"
                            value={
                                profile.partnerExpectations
                                    ?.preferredLocation
                            }
                        />

                        <PrintItem
                            label="Preferred Religion"
                            value={
                                profile.partnerExpectations
                                    ?.preferredReligion
                            }
                        />

                        <PrintItem
                            label="Preferred Caste"
                            value={
                                profile.partnerExpectations
                                    ?.preferredCaste
                            }
                        />

                    </PrintSection>

                    {/* =========================================
                        PHOTOS
                    ========================================= */}

                    <PrintSection title="Photos">

                        <div className="print-photo-gallery">

                            {profile.profilePhoto && (
                                <div className="print-small-photo">
                                    <img
                                        src={profile.profilePhoto}
                                        alt="Profile"
                                    />
                                </div>
                            )}

                            {profile.additionalPhotos?.map(
                                (photo, index) => (
                                    <div
                                        className="print-small-photo"
                                        key={index}
                                    >
                                        <img
                                            src={photo}
                                            alt={`Additional ${index + 1}`}
                                        />
                                    </div>
                                )
                            )}

                        </div>

                    </PrintSection>

                    {/* =========================================
                        HOROSCOPE
                    ========================================= */}

                    {profile.horoscopeImage && (
                        <PrintSection title="Horoscope">

                            <div className="print-horoscope">

                                <img
                                    src={profile.horoscopeImage}
                                    alt="Horoscope"
                                />

                            </div>

                        </PrintSection>
                    )}

                    {/* =========================================
                        FOOTER
                    ========================================= */}

                    <footer className="print-footer">

                        <div>
                            Vetri Matrimony
                        </div>

                        <div>
                            Profile ID:{" "}
                            {displayValue(profile.profileId)}
                        </div>

                    </footer>

                </div>

            </div>
        </div>
    );
}

function PrintSection({ title, children }) {
    return (
        <section className="print-section">

            <div className="print-section-title">
                {title}
            </div>

            <div className="print-section-content">
                {children}
            </div>

        </section>
    );
}

function PrintItem({
    label,
    value,
    fullWidth = false
}) {
    return (
        <div
            className={`print-item ${
                fullWidth ? "print-item-full" : ""
            }`}
        >
            <span className="print-item-label">
                {label}
            </span>

            <span className="print-item-value">
                {value === undefined ||
                value === null ||
                value === ""
                    ? "Not provided"
                    : value}
            </span>
        </div>
    );
}

export default PrintableProfile;