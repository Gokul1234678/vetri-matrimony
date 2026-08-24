import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

import { validateEditProfileForm } from "../../utils/profileValidation";

import LoadingOverlay from "../../components/common/LoadingOverlay";

import AdminLayout from "../../layouts/AdminLayout";

import AccountSection from "../../components/admin/profileForm/AccountSection";
import BasicInformation from "../../components/admin/profileForm/BasicInformation";
import PersonalInformation from "../../components/admin/profileForm/PersonalInformation";
import LocationInformation from "../../components/admin/profileForm/LocationInformation";
import EducationCareer from "../../components/admin/profileForm/EducationCareer";
import FamilyInformation from "../../components/admin/profileForm/FamilyInformation";
import LifestyleInformation from "../../components/admin/profileForm/LifestyleInformation";
import AboutMeSection from "../../components/admin/profileForm/AboutMeSection";
import PartnerExpectation from "../../components/admin/profileForm/PartnerExpectation";
import PhotoSection from "../../components/admin/profileForm/PhotoSection";
import HoroscopeSection from "../../components/admin/profileForm/HoroscopeSection";
import CreditInformation from "../../components/admin/profileForm/CreditInformation";

import "../../assets/css/admin/createProfile.css";

const initialFormData = {
    // Login
    username: "",
    password: "",

    // Basic Information
    fullName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    mobileNumber: "",
    whatsappNumber: "",

    // Personal Information
    height: "",
    weight: "",
    maritalStatus: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",

    // Location Information
    country: "India",
    state: "",
    district: "",
    address: "",

    // Education & Career
    qualification: "",
    occupation: "",
    companyName: "",
    employmentType: "",
    annualIncome: "",

    // Family
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",

    // Lifestyle
    eatingHabit: "",
    smokingHabit: "",
    drinkingHabit: "",
    physicalStatus: "",

    // About Me
    aboutMe: "",

    // Partner Expectations
    partnerExpectations: {
        preferredAge: "",
        preferredEducation: "",
        preferredLocation: "",
        preferredReligion: "",
        preferredCaste: "",
    },

    // Images
    profilePhoto: null,
    additionalPhotos: [],
    horoscopeImage: null,

    // Credits
    credits: 0,

    // Status
    status: "active",
};

function EditProfile() {
    const navigate = useNavigate();
    const { id } = useParams();

    const formRef = useRef(null);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("");

    // ============================
    // Handle Input Change
    // ============================

    const handleChange = (e) => {
        const { name, value } = e.target;

        const partnerFields = [
            "preferredAge",
            "preferredEducation",
            "preferredLocation",
            "preferredReligion",
            "preferredCaste",
        ];

        if (partnerFields.includes(name)) {
            setFormData((prev) => ({
                ...prev,
                partnerExpectations: {
                    ...prev.partnerExpectations,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // ============================
    // Handle Image Change
    // ============================

    const handleImageChange = (e) => {
        const { name, files } = e.target;

        if (!files || files.length === 0) {
            return;
        }

        switch (name) {
            case "profilePhoto":
                setFormData((prev) => ({
                    ...prev,
                    profilePhoto: files[0],
                }));
                break;

            case "horoscopeImage":
                setFormData((prev) => ({
                    ...prev,
                    horoscopeImage: files[0],
                }));
                break;

            case "additionalPhotos":
                setFormData((prev) => ({
                    ...prev,
                    additionalPhotos: [
                        ...prev.additionalPhotos,
                        ...Array.from(files),
                    ].slice(0, 5),
                }));
                break;

            default:
                break;
        }
    };

    // ============================
    // Remove Image
    // ============================

    const removeImage = (name, index = null) => {
        if (name === "profilePhoto") {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: null,
            }));
        }

        if (name === "horoscopeImage") {
            setFormData((prev) => ({
                ...prev,
                horoscopeImage: null,
            }));
        }

        if (name === "additionalPhotos") {
            setFormData((prev) => ({
                ...prev,
                additionalPhotos:
                    prev.additionalPhotos.filter(
                        (_, i) => i !== index
                    ),
            }));
        }
    };

    // ============================
    // Format Date For Input
    // ============================

    const formatDateForInput = (date) => {
        if (!date) {
            return "";
        }

        const formattedDate =
            new Date(date)
                .toISOString()
                .split("T")[0];

        return formattedDate;
    };

    // ============================
    // Load Profile
    // ============================

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                `/admin/profiles/${id}`
            );

            const data = response.data;

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to fetch profile"
                );
            }

            const profile = data.profile;

            setFormData({
                username:
                    profile.userId?.username || "",

                password: "",

                fullName:
                    profile.fullName || "",

                gender:
                    profile.gender || "",

                dateOfBirth:
                    formatDateForInput(
                        profile.dateOfBirth
                    ),

                age:
                    profile.age ?? "",

                mobileNumber:
                    profile.mobileNumber || "",

                whatsappNumber:
                    profile.whatsappNumber || "",

                height:
                    profile.height || "",

                weight:
                    profile.weight || "",

                maritalStatus:
                    profile.maritalStatus || "",

                religion:
                    profile.religion || "",

                caste:
                    profile.caste || "",

                subCaste:
                    profile.subCaste || "",

                motherTongue:
                    profile.motherTongue || "",

                country:
                    profile.country || "India",

                state:
                    profile.state || "",

                district:
                    profile.district || "",

                address:
                    profile.address || "",

                qualification:
                    profile.qualification || "",

                occupation:
                    profile.occupation || "",

                companyName:
                    profile.companyName || "",

                employmentType:
                    profile.employmentType || "",

                annualIncome:
                    profile.annualIncome || "",

                fatherName:
                    profile.fatherName || "",

                fatherOccupation:
                    profile.fatherOccupation || "",

                motherName:
                    profile.motherName || "",

                motherOccupation:
                    profile.motherOccupation || "",

                brothers:
                    profile.brothers ?? "",

                sisters:
                    profile.sisters ?? "",

                eatingHabit:
                    profile.eatingHabit || "",

                smokingHabit:
                    profile.smokingHabit || "",

                drinkingHabit:
                    profile.drinkingHabit || "",

                physicalStatus:
                    profile.physicalStatus || "",

                aboutMe:
                    profile.aboutMe || "",

                partnerExpectations: {
                    preferredAge:
                        profile.partnerExpectations
                            ?.preferredAge || "",

                    preferredEducation:
                        profile.partnerExpectations
                            ?.preferredEducation || "",

                    preferredLocation:
                        profile.partnerExpectations
                            ?.preferredLocation || "",

                    preferredReligion:
                        profile.partnerExpectations
                            ?.preferredReligion || "",

                    preferredCaste:
                        profile.partnerExpectations
                            ?.preferredCaste || "",
                },

                profilePhoto:
                    profile.profilePhoto || null,

                additionalPhotos:
                    profile.additionalPhotos || [],

                horoscopeImage:
                    profile.horoscopeImage || null,

                credits:
                    profile.credits ?? 0,

                status:
                    profile.status || "active",
            });

        } catch (error) {
            console.error(
                "Fetch Profile Error:",
                error
            );

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

    // ============================
    // Load Profile On Page Load
    // ============================

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id]);

    // ============================
    // Upload New Images
    // ============================

    const uploadImages = async () => {
        const imageFormData = new FormData();

        let hasNewImage = false;

        // ============================
        // Profile Photo
        // ============================

        if (
            formData.profilePhoto &&
            formData.profilePhoto instanceof File
        ) {
            imageFormData.append(
                "profilePhoto",
                formData.profilePhoto
            );

            hasNewImage = true;
        }

        // ============================
        // Additional Photos
        // ============================

        const newAdditionalPhotos =
            formData.additionalPhotos.filter(
                (photo) => photo instanceof File
            );

        newAdditionalPhotos.forEach((photo) => {
            imageFormData.append(
                "additionalPhotos",
                photo
            );
        });

        if (newAdditionalPhotos.length > 0) {
            hasNewImage = true;
        }

        // ============================
        // Horoscope
        // ============================

        if (
            formData.horoscopeImage &&
            formData.horoscopeImage instanceof File
        ) {
            imageFormData.append(
                "horoscopeImage",
                formData.horoscopeImage
            );

            hasNewImage = true;
        }

        // ============================
        // No New Images
        // ============================

        if (!hasNewImage) {
            return {
                profilePhoto:
                    formData.profilePhoto,

                additionalPhotos:
                    formData.additionalPhotos,

                horoscopeImage:
                    formData.horoscopeImage,
            };
        }

        // ============================
        // Upload
        // ============================

        const response = await api.post(
            "/admin/upload-images",
            imageFormData
        );

        const data = response.data;

        if (!data.success) {
            throw new Error(
                data.message ||
                "Image upload failed"
            );
        }

        return {
            profilePhoto:
                data.images.profilePhoto ||
                formData.profilePhoto,

            additionalPhotos:
                data.images.additionalPhotos ||
                formData.additionalPhotos,

            horoscopeImage:
                data.images.horoscopeImage ||
                formData.horoscopeImage,
        };
    };

    // ============================
    // Update Profile
    // ============================

    const updateProfile = async (images) => {
        const profilePayload = {
            ...formData,

            profilePhoto:
                images.profilePhoto,

            additionalPhotos:
                images.additionalPhotos,

            horoscopeImage:
                images.horoscopeImage,
        };

        const response = await api.put(
            `/admin/profiles/${id}`,
            profilePayload
        );

        const data = response.data;

        if (!data.success) {
            throw new Error(
                data.message ||
                "Failed to update profile"
            );
        }

        return data;
    };

    // ============================
    // Submit
    // ============================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors =
            validateEditProfileForm(formData);

        if (
            Object.keys(validationErrors).length > 0
        ) {
            setErrors(validationErrors);

            toast.error(
                "Please correct the highlighted fields."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            // ============================
            // Upload Images
            // ============================

            setLoadingMessage(
                "Uploading images..."
            );

            const images =
                await uploadImages();

            // ============================
            // Update Profile
            // ============================

            setLoadingMessage(
                "Updating profile..."
            );

            const result =
                await updateProfile(images);

            // ============================
            // Success
            // ============================

            toast.success(
                result.message ||
                "Profile updated successfully"
            );

            // ============================
            // Redirect
            // ============================

            navigate("/admin/profiles");

        } catch (error) {
            console.error(
                "Update Profile Error:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to update profile";

            toast.error(message);

        } finally {
            setIsSubmitting(false);
            setLoadingMessage("");
        }
    };

    // ============================
    // Page Loading
    // ============================

    if (loading) {
        return (
            <AdminLayout>

                <LoadingOverlay
                    show={true}
                    message="Loading profile..."
                />

                <div className="page-header">
                    <div>
                        <h1>Edit Profile</h1>
                        <p>
                            Loading profile information...
                        </p>
                    </div>
                </div>

            </AdminLayout>
        );
    }

    // ============================
    // Page
    // ============================

    return (
        <AdminLayout>

            <LoadingOverlay
                show={isSubmitting}
                message={loadingMessage}
            />

            <div className="page-header">
                <div>
                    <h1>Edit Profile</h1>
                    <p>
                        Update matrimonial profile information.
                    </p>
                </div>
            </div>

            <form
                ref={formRef}
                className="create-profile-form"
                onSubmit={handleSubmit}
            >

                <div className="create-profile-columns">

                    {/* ============================
                        LEFT COLUMN
                    ============================ */}

                    <div className="create-profile-left">

                        <BasicInformation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <PersonalInformation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <LocationInformation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <EducationCareer
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <FamilyInformation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <HoroscopeSection
                            formData={formData}
                            errors={errors}
                            handleImageChange={
                                handleImageChange
                            }
                            removeImage={
                                removeImage
                            }
                        />

                        <LifestyleInformation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                    </div>

                    {/* ============================
                        RIGHT COLUMN
                    ============================ */}

                    <div className="create-profile-right">

                        <AboutMeSection
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <PartnerExpectation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <PhotoSection
                            formData={formData}
                            errors={errors}
                            handleImageChange={
                                handleImageChange
                            }
                            removeImage={
                                removeImage
                            }
                        />

                        <AccountSection
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                        <CreditInformation
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                        />

                    </div>

                </div>

                {/* ============================
                    FORM ACTIONS
                ============================ */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="reset-btn"
                        onClick={fetchProfile}
                        disabled={isSubmitting}
                    >
                        <i className="bi bi-arrow-counterclockwise"></i>

                        Reset Changes
                    </button>

                    <div className="form-actions-right">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/admin/profiles"
                                )
                            }
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-profile-btn"
                            disabled={isSubmitting}
                        >
                            <i className="bi bi-check-circle-fill"></i>

                            {isSubmitting
                                ? "Updating..."
                                : "Update Profile"}
                        </button>

                    </div>

                </div>

            </form>

        </AdminLayout>
    );
}

export default EditProfile;