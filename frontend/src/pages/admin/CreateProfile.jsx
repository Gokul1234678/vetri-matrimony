import { useRef, useState } from "react";
import api from "../../services/api";

import { validateProfileForm } from "../../utils/profileValidation";

import LoadingOverlay from "../../components/common/LoadingOverlay";
import { useNavigate } from "react-router-dom";

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

import { toast } from "react-toastify";

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
    // city: "",
    address: "",
    // pincode: "",

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

    // Partner Expectation
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

    // Credit Information
    credits: 0,
};

function CreateProfile() {

    const navigate = useNavigate();

    const formRef = useRef(null);


    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

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

    const handleImageChange = (e) => {
        const { name, files } = e.target;

        if (!files || files.length === 0) return;

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
                    ].slice(0, 5), // Maximum 5 photos
                }));
                break;

            default:
                break;
        }
    };

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
                additionalPhotos: prev.additionalPhotos.filter(
                    (_, i) => i !== index
                ),
            }));
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors({});
    };

    // Image upload function
    // Uploads profile photo, additional photos, and horoscope image
    const uploadImages = async () => {
        const imageFormData = new FormData();

        // ============================
        // Profile Photo
        // ============================

        if (formData.profilePhoto) {
            imageFormData.append(
                "profilePhoto",
                formData.profilePhoto
            );
        }

        // ============================
        // Additional Photos
        // Maximum: 5
        // ============================

        formData.additionalPhotos.forEach((photo) => {
            imageFormData.append(
                "additionalPhotos",
                photo
            );
        });

        // ============================
        // Horoscope Image
        // ============================

        if (formData.horoscopeImage) {
            imageFormData.append(
                "horoscopeImage",
                formData.horoscopeImage
            );
        }

        // ============================
        // Upload to Backend
        // ============================

        const response = await api.post(
            "/admin/upload-images",
            imageFormData
        );

        const data = response.data;

        // ============================
        // Check Response
        // ============================

        if (!data.success) {
            throw new Error(
                data.message || "Image upload failed"
            );
        }

        return data.images;
    };

    // Create profile function  
    const createProfile = async (images) => {

        const profilePayload = {
            ...formData,

            profilePhoto: images.profilePhoto,

            additionalPhotos: images.additionalPhotos,

            horoscopeImage: images.horoscopeImage,
        };

        const response = await api.post(
            "/admin/profiles",
            profilePayload
        );

        const data = response.data;

        if (!data.success) {
            throw new Error(
                data.message || "Failed to create profile"
            );
        }

        return data;
    };



// Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const validationErrors =
            validateProfileForm(formData);

            // If there are validation errors, set them in state and show a toast notification
        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            toast.error(
                "Please correct the highlighted fields."
            );

            return;
        }

        try {

            setIsSubmitting(true);

            // ============================
            // 1. Upload Images
            // ============================

            setLoadingMessage(
                "Uploading images..."
            );

            const images =
                await uploadImages();

            // ============================
            // 2. Create Profile
            // ============================

            setLoadingMessage(
                "Creating profile..."
            );

            const result =
                await createProfile(images);

            // ============================
            // 3. Success
            // ============================

            toast.success(
                `${result.profileId} - ${result.message}`
            );

            // ============================
            // 4. Redirect
            // ============================

            navigate("/admin/profiles");

        } catch (error) {

            console.error(
                "Create Profile Error:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to create profile";

            toast.error(message);

        } finally {

            setIsSubmitting(false);

            setLoadingMessage("");

        }
    };


    return (
        <AdminLayout>

            {/* Loading Overlay */}
            <LoadingOverlay
                show={isSubmitting}
                message={loadingMessage}
            />


            <div className="page-header">
                <div>
                    <h1>Create Profile</h1>
                    <p>Add a new matrimonial profile.</p>
                </div>
            </div>

           <form
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
                handleImageChange={handleImageChange}
                removeImage={removeImage}
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
                handleImageChange={handleImageChange}
                removeImage={removeImage}
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

       {/* FORM ACTIONS */}

    <div className="form-actions">

        <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
        >
            <i className="bi bi-arrow-counterclockwise"></i>
            Reset Form
        </button>

        <div className="form-actions-right">

            <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/admin/profiles")}
            >
                Cancel
            </button>

            <button
                type="submit"
                className="create-profile-btn"
                disabled={isSubmitting}
            >
                <i className="bi bi-person-plus-fill"></i>

                {isSubmitting
                    ? "Creating..."
                    : "Create Profile"}
            </button>

        </div>

    </div>
</form>
        </AdminLayout>
    );
}

export default CreateProfile;