import { useRef, useState } from "react";
import api from "../../services/api";
import { validateRegisterForm } from "../../utils/registerValidation";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
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
import "../../assets/css/public/register.css";
import { toast } from "react-toastify";

const initialFormData = {
    username: "",
    password: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    mobileNumber: "",
    whatsappNumber: "",
    height: "",
    weight: "",
    maritalStatus: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",
    country: "India",
    state: "",
    district: "",
    address: "",
    qualification: "",
    occupation: "",
    companyName: "",
    annualIncome: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: {
        eb: { total: "", married: "" },
        yb: { total: "", married: "" },
        es: { total: "", married: "" },
        ys: { total: "", married: "" }
    },
    eatingHabit: "",
    smokingHabit: "",
    drinkingHabit: "",
    aboutMe: "",
    partnerExpectations: {
        preferredAge: "",
        preferredEducation: "",
        preferredLocation: "",
        preferredReligion: "",
        preferredCaste: ""
    },
    profilePhoto: null,
    additionalPhotos: [],
    horoscopeImage: null
};

function Register() {
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return "";

        const birthDate = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const partnerFields = [
            "preferredAge",
            "preferredEducation",
            "preferredLocation",
            "preferredReligion",
            "preferredCaste"
        ];

        if (partnerFields.includes(name)) {
            setFormData((prev) => ({
                ...prev,
                partnerExpectations: {
                    ...prev.partnerExpectations,
                    [name]: value
                }
            }));
        } else if (name.startsWith("siblings.")) {
            const [, siblingType, field] = name.split(".");

            setFormData((prev) => ({
                ...prev,
                siblings: {
                    ...prev.siblings,
                    [siblingType]: {
                        ...prev.siblings[siblingType],
                        [field]: value
                    }
                }
            }));
        } else if (name === "dateOfBirth") {
            const calculatedAge = calculateAge(value);

            setFormData((prev) => ({
                ...prev,
                dateOfBirth: value,
                age: calculatedAge
            }));

            setErrors((prev) => ({
                ...prev,
                dateOfBirth: "",
                age: ""
            }));

            return;
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
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
                    profilePhoto: files[0]
                }));
                break;

            case "horoscopeImage":
                setFormData((prev) => ({
                    ...prev,
                    horoscopeImage: files[0]
                }));
                break;

            case "additionalPhotos":
                setFormData((prev) => ({
                    ...prev,
                    additionalPhotos: [
                        ...prev.additionalPhotos,
                        ...Array.from(files)
                    ].slice(0, 4)
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
                profilePhoto: null
            }));
        }

        if (name === "horoscopeImage") {
            setFormData((prev) => ({
                ...prev,
                horoscopeImage: null
            }));
        }

        if (name === "additionalPhotos") {
            setFormData((prev) => ({
                ...prev,
                additionalPhotos: prev.additionalPhotos.filter(
                    (_, i) => i !== index
                )
            }));
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors({});
    };

    const uploadImages = async () => {
        const imageFormData = new FormData();

        if (formData.profilePhoto) {
            imageFormData.append(
                "profilePhoto",
                formData.profilePhoto
            );
        }

        formData.additionalPhotos.forEach((photo) => {
            imageFormData.append(
                "additionalPhotos",
                photo
            );
        });

        if (formData.horoscopeImage) {
            imageFormData.append(
                "horoscopeImage",
                formData.horoscopeImage
            );
        }

        const response = await api.post(
            "/admin/upload-images",
            imageFormData
        );

        const data = response.data;

        if (!data.success) {
            throw new Error(
                data.message || "Image upload failed"
            );
        }

        return data.images;
    };

    const checkUsername = async () => {
        const username = formData.username?.trim();

        if (!username) {
            return false;
        }

        const response = await api.get(
            `/check-username/${encodeURIComponent(username)}`
        );

        const data = response.data;

        if (data.exists) {
            setErrors((prev) => ({
                ...prev,
                username: "Username already exists"
            }));

            toast.error("Username already exists");

            return false;
        }

        return true;
    };

    const registerUser = async (images) => {
        const { age, ...registrationData } = formData;

        const payload = {
            ...registrationData,
            profilePhoto: images.profilePhoto,
            additionalPhotos: images.additionalPhotos,
            horoscopeImage: images.horoscopeImage
        };

        const response = await api.post(
            "/register",
            payload
        );

        const data = response.data;

        if (!data.success) {
            throw new Error(
                data.message || "Registration failed"
            );
        }

        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateRegisterForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please correct the highlighted fields.");
            return;
        }

        try {
            setIsSubmitting(true);

            setLoadingMessage("Checking username...");

            const usernameAvailable = await checkUsername();

            if (!usernameAvailable) {
                return;
            }

            setLoadingMessage("Uploading images...");

            const images = await uploadImages();

            setLoadingMessage("Creating your profile...");

            const result = await registerUser(images);

            toast.success(
                `${result.profileId} - Registration successful`
            );

            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);

            const message =
                error.response?.data?.message ||
                error.message ||
                "Registration failed";

            toast.error(message);
        } finally {
            setIsSubmitting(false);
            setLoadingMessage("");
        }
    };

    return (
        <>
            <LoadingOverlay
                show={isSubmitting}
                message={loadingMessage}
            />

            <div className="register-page">
                <div className="register-container">
<div className="register-header">
    <img
        src={logo}
        alt="Anbinai Matrimony"
        className="register-logo"
    />

    <h1>Create Your Matrimonial Profile</h1>

    <p>
        Complete your profile and find the right match for you.
    </p>

    <div className="register-login-link">
        Already have an account?
        <button
            type="button"
            onClick={() => navigate("/login")}
        >
            Login
        </button>
    </div>
</div>

                    <form
                        ref={formRef}
                        className="register-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="register-columns">
                            <div className="register-left">
                                <BasicInformation
                                    formData={formData}
                                    errors={errors}
                                    handleChange={handleChange}
                                    showProfileId={false}
                                    showStatus={false}
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

                            <div className="register-right">
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
                            </div>
                        </div>

                        <div className="register-actions">
                            <button
                                type="button"
                                className="register-reset-btn"
                                onClick={handleReset}
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-arrow-counterclockwise"></i>
                                Reset Form
                            </button>

                            <button
                                type="button"
                                className="register-cancel-btn"
                                onClick={() => navigate("/login")}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="register-submit-btn"
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-person-plus-fill"></i>
                                {isSubmitting
                                    ? " Registering..."
                                    : " Create Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;