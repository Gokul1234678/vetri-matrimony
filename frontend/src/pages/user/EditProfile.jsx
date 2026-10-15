import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLoader from "../../components/common/PageLoader";
import LoadingOverlay from "../../components/common/LoadingOverlay";

import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

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

import api from "../../services/api";

import "../../assets/css/user/editProfile.css";

import { toast } from "react-toastify";

const initialFormData = {
    profileId: "",
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
        eb: { total: 0, married: 0 },
        yb: { total: 0, married: 0 },
        es: { total: 0, married: 0 },
        ys: { total: 0, married: 0 }
    },
    eatingHabit: "",
    smokingHabit: "No",
    drinkingHabit: "No",
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

const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
        return "";
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    if (Number.isNaN(birthDate.getTime())) {
        return "";
    }

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff =
        today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 &&
            today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

const formatDateForInput = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toISOString().split("T")[0];
};

const normalizeProfile = (profile, user = null) => ({
    profileId: profile?.profileId || "",
    username:
        profile?.username ||
        user?.username ||
        profile?.userId?.username ||
        "",
    password: "",
    fullName: profile?.fullName || "",
    gender: profile?.gender || "",
    dateOfBirth: formatDateForInput(profile?.dateOfBirth),
    age: profile?.age || "",
    mobileNumber: profile?.mobileNumber || "",
    whatsappNumber: profile?.whatsappNumber || "",
    height: profile?.height || "",
    weight: profile?.weight || "",
    maritalStatus: profile?.maritalStatus || "",
    religion: profile?.religion || "",
    caste: profile?.caste || "",
    subCaste: profile?.subCaste || "",
    motherTongue: profile?.motherTongue || "",
    country: profile?.country || "India",
    state: profile?.state || "",
    district: profile?.district || "",
    address: profile?.address || "",
    qualification: profile?.qualification || "",
    occupation: profile?.occupation || "",
    companyName: profile?.companyName || "",
    annualIncome: profile?.annualIncome || "",
    fatherName: profile?.fatherName || "",
    fatherOccupation: profile?.fatherOccupation || "",
    motherName: profile?.motherName || "",
    motherOccupation: profile?.motherOccupation || "",
    siblings: {
        eb: {
            total: Number(profile?.siblings?.eb?.total || 0),
            married: Number(profile?.siblings?.eb?.married || 0)
        },
        yb: {
            total: Number(profile?.siblings?.yb?.total || 0),
            married: Number(profile?.siblings?.yb?.married || 0)
        },
        es: {
            total: Number(profile?.siblings?.es?.total || 0),
            married: Number(profile?.siblings?.es?.married || 0)
        },
        ys: {
            total: Number(profile?.siblings?.ys?.total || 0),
            married: Number(profile?.siblings?.ys?.married || 0)
        }
    },
    eatingHabit: profile?.eatingHabit || "",
    smokingHabit: profile?.smokingHabit || "No",
    drinkingHabit: profile?.drinkingHabit || "No",
    aboutMe: profile?.aboutMe || "",
    partnerExpectations: {
        preferredAge:
            profile?.partnerExpectations?.preferredAge || "",
        preferredEducation:
            profile?.partnerExpectations?.preferredEducation || "",
        preferredLocation:
            profile?.partnerExpectations?.preferredLocation || "",
        preferredReligion:
            profile?.partnerExpectations?.preferredReligion || "",
        preferredCaste:
            profile?.partnerExpectations?.preferredCaste || ""
    },
    profilePhoto: profile?.profilePhoto || null,
    additionalPhotos: Array.isArray(profile?.additionalPhotos)
        ? profile.additionalPhotos
        : [],
    horoscopeImage: profile?.horoscopeImage || null
});

function EditProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(
        "Loading your profile..."
    );

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);

            const response = await api.get("/user/profile");

            const profile =
                response?.data?.profile ||
                response?.data?.data?.profile ||
                response?.data?.data;

            const user =
                response?.data?.user ||
                response?.data?.data?.user ||
                null;

            if (!profile) {
                throw new Error("Profile data not found");
            }

            const normalizedProfile = normalizeProfile(
                profile,
                user
            );

            setFormData(normalizedProfile);
        } catch (error) {
            console.error("Fetch Profile Error:", error);

            toast.error(
                error?.response?.data?.message ||
                    "Unable to load your profile."
            );

            navigate("/my-profile");
        } finally {
            setIsLoading(false);
        }
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
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;

        if (!files || files.length === 0) {
            return;
        }

        if (name === "profilePhoto") {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: files[0]
            }));

            setErrors((prev) => ({
                ...prev,
                profilePhoto: ""
            }));

            return;
        }

        if (name === "horoscopeImage") {
            setFormData((prev) => ({
                ...prev,
                horoscopeImage: files[0]
            }));

            setErrors((prev) => ({
                ...prev,
                horoscopeImage: ""
            }));

            return;
        }

        if (name === "additionalPhotos") {
            setFormData((prev) => ({
                ...prev,
                additionalPhotos: [
                    ...prev.additionalPhotos,
                    ...Array.from(files)
                ].slice(0, 4)
            }));

            setErrors((prev) => ({
                ...prev,
                additionalPhotos: ""
            }));
        }
    };

    const removeImage = (name, index = null) => {
        if (name === "profilePhoto") {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: null
            }));

            return;
        }

        if (name === "horoscopeImage") {
            setFormData((prev) => ({
                ...prev,
                horoscopeImage: null
            }));

            return;
        }

        if (name === "additionalPhotos") {
            setFormData((prev) => ({
                ...prev,
                additionalPhotos:
                    prev.additionalPhotos.filter(
                        (_, i) => i !== index
                    )
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        const username =
            formData.username?.trim() || "";

        if (!username) {
            newErrors.username = "Username is required";
        }

        if (
            formData.password &&
            formData.password.length < 6
        ) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName =
                "Full name is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth =
                "Date of birth is required";
        } else if (
            calculateAge(formData.dateOfBirth) < 18
        ) {
            newErrors.dateOfBirth =
                "Age must be at least 18 years";
        }

        if (!formData.mobileNumber) {
            newErrors.mobileNumber =
                "Mobile number is required";
        } else if (
            !/^\d{10}$/.test(formData.mobileNumber)
        ) {
            newErrors.mobileNumber =
                "Mobile number must contain exactly 10 digits";
        }

        if (
            formData.whatsappNumber &&
            !/^\d{10}$/.test(formData.whatsappNumber)
        ) {
            newErrors.whatsappNumber =
                "WhatsApp number must contain exactly 10 digits";
        }

        if (!formData.maritalStatus) {
            newErrors.maritalStatus =
                "Marital status is required";
        }

        if (!formData.religion.trim()) {
            newErrors.religion =
                "Religion is required";
        }

        if (!formData.caste.trim()) {
            newErrors.caste =
                "Caste is required";
        }

        if (!formData.motherTongue.trim()) {
            newErrors.motherTongue =
                "Mother tongue is required";
        }

        if (!formData.district.trim()) {
            newErrors.district =
                "District is required";
        }

        if (!formData.state.trim()) {
            newErrors.state =
                "State is required";
        }

        if (!formData.profilePhoto) {
            newErrors.profilePhoto =
                "Profile photo is required";
        }

        if (formData.additionalPhotos.length > 4) {
            newErrors.additionalPhotos =
                "Maximum 4 additional photos are allowed";
        }

        const siblingTypes = [
            "eb",
            "yb",
            "es",
            "ys"
        ];

        siblingTypes.forEach((type) => {
            const total = Number(
                formData.siblings[type]?.total || 0
            );

            const married = Number(
                formData.siblings[type]?.married || 0
            );

            if (!Number.isInteger(total) || total < 0) {
                newErrors[
                    `siblings.${type}.total`
                ] = "Total cannot be negative";
            }

            if (
                !Number.isInteger(married) ||
                married < 0
            ) {
                newErrors[
                    `siblings.${type}.married`
                ] = "Married count cannot be negative";
            }

            if (married > total) {
                newErrors[
                    `siblings.${type}.married`
                ] =
                    "Married count cannot be greater than total";
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const uploadImages = async () => {
        const imageFormData = new FormData();

        let hasNewImage = false;

        if (
            formData.profilePhoto instanceof File
        ) {
            imageFormData.append(
                "profilePhoto",
                formData.profilePhoto
            );

            hasNewImage = true;
        }

        formData.additionalPhotos.forEach((photo) => {
            if (photo instanceof File) {
                imageFormData.append(
                    "additionalPhotos",
                    photo
                );

                hasNewImage = true;
            }
        });

        if (
            formData.horoscopeImage instanceof File
        ) {
            imageFormData.append(
                "horoscopeImage",
                formData.horoscopeImage
            );

            hasNewImage = true;
        }

        if (!hasNewImage) {
            return {
                profilePhoto:
                    formData.profilePhoto,
                additionalPhotos:
                    formData.additionalPhotos,
                horoscopeImage:
                    formData.horoscopeImage
            };
        }

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

        return data.images;
    };

    const buildImagePayload = (uploadedImages) => {
        let profilePhoto =
            formData.profilePhoto;

        if (
            formData.profilePhoto instanceof File
        ) {
            profilePhoto =
                uploadedImages.profilePhoto;
        }

        const existingAdditionalPhotos =
            formData.additionalPhotos.filter(
                (photo) =>
                    typeof photo === "string"
            );

        const newAdditionalPhotos =
            formData.additionalPhotos.filter(
                (photo) =>
                    photo instanceof File
            );

        const uploadedAdditionalPhotos =
            uploadedImages.additionalPhotos || [];

        const additionalPhotos = [
            ...existingAdditionalPhotos,
            ...newAdditionalPhotos
                .map(
                    (_, index) =>
                        uploadedAdditionalPhotos[
                            index
                        ]
                )
        ].filter(Boolean);

        let horoscopeImage =
            formData.horoscopeImage;

        if (
            formData.horoscopeImage instanceof File
        ) {
            horoscopeImage =
                uploadedImages.horoscopeImage;
        }

        return {
            profilePhoto,
            additionalPhotos,
            horoscopeImage
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error(
                "Please correct the highlighted fields."
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return;
        }

        try {
            setIsSubmitting(true);

            setLoadingMessage(
                "Uploading images..."
            );

            const uploadedImages =
                await uploadImages();

            const imagePayload =
                buildImagePayload(
                    uploadedImages
                );

            if (!imagePayload.profilePhoto) {
                toast.error(
                    "Profile photo is required."
                );

                return;
            }

            setLoadingMessage(
                "Updating your profile..."
            );

            const payload = {
                username:
                    formData.username.trim(),

                ...(formData.password.trim()
                    ? {
                          password:
                              formData.password.trim()
                      }
                    : {}),

                fullName:
                    formData.fullName.trim(),

                gender: formData.gender,

                dateOfBirth:
                    formData.dateOfBirth,

                mobileNumber:
                    formData.mobileNumber,

                whatsappNumber:
                    formData.whatsappNumber,

                height:
                    formData.height,

                weight:
                    formData.weight,

                maritalStatus:
                    formData.maritalStatus,

                religion:
                    formData.religion.trim(),

                caste:
                    formData.caste.trim(),

                subCaste:
                    formData.subCaste.trim(),

                motherTongue:
                    formData.motherTongue.trim(),

                country:
                    formData.country.trim(),

                state:
                    formData.state.trim(),

                district:
                    formData.district.trim(),

                address:
                    formData.address.trim(),

                qualification:
                    formData.qualification.trim(),

                occupation:
                    formData.occupation.trim(),

                companyName:
                    formData.companyName.trim(),

                annualIncome:
                    formData.annualIncome.trim(),

                fatherName:
                    formData.fatherName.trim(),

                fatherOccupation:
                    formData.fatherOccupation.trim(),

                motherName:
                    formData.motherName.trim(),

                motherOccupation:
                    formData.motherOccupation.trim(),

                siblings:
                    formData.siblings,

                eatingHabit:
                    formData.eatingHabit,

                smokingHabit:
                    formData.smokingHabit,

                drinkingHabit:
                    formData.drinkingHabit,

                aboutMe:
                    formData.aboutMe.trim(),

                partnerExpectations:
                    formData.partnerExpectations,

                profilePhoto:
                    imagePayload.profilePhoto,

                additionalPhotos:
                    imagePayload.additionalPhotos,

                horoscopeImage:
                    imagePayload.horoscopeImage
            };

            const response = await api.put(
                "/user/profile",
                payload
            );

            toast.success(
                response?.data?.message ||
                    "Profile updated successfully."
            );

            navigate("/my-profile");
        } catch (error) {
            console.error(
                "Update Profile Error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update profile.";

            if (
                message
                    .toLowerCase()
                    .includes(
                        "username already exists"
                    )
            ) {
                setErrors((prev) => ({
                    ...prev,
                    username:
                        "Username already exists"
                }));
            }

            toast.error(message);
        } finally {
            setIsSubmitting(false);
            setLoadingMessage("");
        }
    };

    if (isLoading) {
        return (
            <>
                <UserNavbar />

<section className="my-profile-page edit-profile-page">
    <div className="container edit-profile-container">
                        <PageLoader text="Loading your profile..." />
                    </div>
                </section>

                <Footer />
            </>
        );
    }

    return (
        <>
            <LoadingOverlay
                show={isSubmitting}
                message={loadingMessage}
            />

            <UserNavbar />

            <section className="my-profile-page">
                <div className="container">

                    <div className="edit-profile-header">
                        <div className="edit-profile-header-content">
                            <button
                                type="button"
                                className="edit-profile-back-btn"
                                onClick={() =>
                                    navigate("/my-profile")
                                }
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-arrow-left"></i>
                                Back to My Profile
                            </button>

                            <h1>Edit Your Profile</h1>

                            <p>
                                Update your information and
                                keep your matrimonial profile
                                up to date.
                            </p>
                        </div>
                    </div>

                    <form
                        className="edit-profile-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="edit-profile-columns">

                            <div className="edit-profile-left">

                                <BasicInformation
                                    formData={formData}
                                    errors={errors}
                                    handleChange={handleChange}
                                    showProfileId={true}
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

                                <LifestyleInformation
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

                            </div>

                            <div className="edit-profile-right">

                                <div className="edit-account-section">

                                    <div className="edit-account-header">

                                        <div className="edit-account-icon">
                                            <i className="bi bi-person-lock"></i>
                                        </div>

                                        <div>
                                            <h2>
                                                Account Information
                                            </h2>

                                            <p>
                                                Update your login
                                                credentials.
                                            </p>
                                        </div>

                                    </div>

                                    <div className="edit-account-body">

                                        <div className="edit-account-grid">

                                            <div className="edit-account-field">

                                                <label
                                                    htmlFor="username"
                                                    className="edit-account-label"
                                                >
                                                    Username{" "}
                                                    <span>*</span>
                                                </label>

                                                <input
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    value={
                                                        formData.username
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className={`edit-account-input ${
                                                        errors.username
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    placeholder="Enter username"
                                                />

                                                {errors.username && (
                                                    <small className="edit-account-error">
                                                        {
                                                            errors.username
                                                        }
                                                    </small>
                                                )}

                                            </div>

                                            <div className="edit-account-field">

                                                <label
                                                    htmlFor="password"
                                                    className="edit-account-label"
                                                >
                                                    New Password
                                                </label>

                                                <input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={
                                                        formData.password
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className={`edit-account-input ${
                                                        errors.password
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    placeholder="Leave blank to keep current password"
                                                />

                                                {errors.password && (
                                                    <small className="edit-account-error">
                                                        {
                                                            errors.password
                                                        }
                                                    </small>
                                                )}

                                                <small className="edit-account-hint">
                                                    Enter a password
                                                    only if you want
                                                    to change it.
                                                </small>

                                            </div>

                                        </div>

                                    </div>

                                </div>

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

                            </div>

                        </div>

                        <div className="edit-profile-actions">

                            <button
                                type="button"
                                className="edit-profile-cancel-btn"
                                onClick={() =>
                                    navigate("/my-profile")
                                }
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-x-circle"></i>
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="edit-profile-save-btn"
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-check-circle-fill"></i>

                                {isSubmitting
                                    ? " Saving..."
                                    : " Save Changes"}
                            </button>

                        </div>

                    </form>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default EditProfile;