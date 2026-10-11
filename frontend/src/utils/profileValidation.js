// Validation function for creating a profile
export const validateProfileForm = (formData) => {
    const errors = {};

    // Login Account
    if (!formData.username?.trim()) {
        errors.username = "Username is required";
    }

    if (!formData.password?.trim()) {
        errors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    // Basic Information
    if (!formData.fullName?.trim()) {
        errors.fullName = "Full name is required";
    }

    if (!formData.gender) {
        errors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.age) {
        errors.age = "Age is required";
    } else if (Number(formData.age) < 18) {
        errors.age = "Age must be at least 18";
    }

    if (!formData.mobileNumber?.trim()) {
        errors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        errors.mobileNumber = "Mobile number must contain exactly 10 digits";
    }

    if (formData.whatsappNumber?.trim()) {
        if (!/^\d{10}$/.test(formData.whatsappNumber)) {
            errors.whatsappNumber =
                "WhatsApp number must contain exactly 10 digits";
        }
    }

    if (!formData.status) {
        errors.status = "Profile status is required";
    }

    // Personal Information
    if (!formData.maritalStatus) {
        errors.maritalStatus = "Marital status is required";
    }

    if (!formData.religion?.trim()) {
        errors.religion = "Religion is required";
    }

    if (!formData.caste?.trim()) {
        errors.caste = "Caste is required";
    }

    if (!formData.motherTongue?.trim()) {
        errors.motherTongue = "Mother tongue is required";
    }

    if (formData.weight !== "") {
        if (Number(formData.weight) <= 0) {
            errors.weight = "Weight must be greater than 0";
        }
    }

    // Location Information
    if (!formData.address?.trim()) {
        errors.address = "Address is required";
    }

    if (!formData.district?.trim()) {
        errors.district = "District is required";
    }

    if (!formData.state?.trim()) {
        errors.state = "State is required";
    }

    if (!formData.country?.trim()) {
        errors.country = "Country is required";
    }

    // Education & Career
    if (formData.annualIncome?.trim()) {
        const income = Number(
            formData.annualIncome
                .replace(/,/g, "")
                .replace(/[₹$]/g, "")
        );

        if (income < 0) {
            errors.annualIncome = "Annual income cannot be negative";
        }
    }

    // Family Information
    const siblings = formData.siblings || {};

    const siblingTypes = ["eb", "yb", "es", "ys"];

    siblingTypes.forEach((type) => {
        const total = siblings[type]?.total;
        const married = siblings[type]?.married;

        if (total !== "" && total !== undefined && Number(total) < 0) {
            errors.siblings = {
                ...errors.siblings,
                [type]: {
                    ...errors.siblings?.[type],
                    total: "Total cannot be negative"
                }
            };
        }

        if (married !== "" && married !== undefined && Number(married) < 0) {
            errors.siblings = {
                ...errors.siblings,
                [type]: {
                    ...errors.siblings?.[type],
                    married: "Married count cannot be negative"
                }
            };
        }

        if (
            total !== "" &&
            total !== undefined &&
            married !== "" &&
            married !== undefined &&
            Number(married) > Number(total)
        ) {
            errors.siblings = {
                ...errors.siblings,
                [type]: {
                    ...errors.siblings?.[type],
                    married: "Married count cannot exceed total"
                }
            };
        }
    });

    // About Me
    if (formData.aboutMe?.length > 1000) {
        errors.aboutMe = "About Me cannot exceed 1000 characters";
    }

    // Partner Expectations
    const partner = formData.partnerExpectations || {};

    if (partner.preferredAge?.trim()) {
        // No strict format because schema stores this as String.
    }

    // Profile Photos
    if (!formData.profilePhoto) {
        errors.profilePhoto = "Profile photo is required";
    }

    if (formData.additionalPhotos?.length > 4) {
        errors.additionalPhotos =
            "You can upload a maximum of 4 additional photos";
    }

    // Credits
    if (
        formData.credits === "" ||
        formData.credits === null ||
        formData.credits === undefined
    ) {
        errors.credits = "Credits are required";
    } else if (Number(formData.credits) < 0) {
        errors.credits = "Credits cannot be negative";
    }

    return errors;
};

// Validation function for editing a profile
export const validateEditProfileForm = (formData) => {
    const errors = {};

    // Login Account
    if (!formData.username?.trim()) {
        errors.username = "Username is required";
    }

    // Password is optional during edit.
    if (formData.password?.trim()) {
        if (formData.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
    }

    // Basic Information
    if (!formData.fullName?.trim()) {
        errors.fullName = "Full name is required";
    }

    if (!formData.gender) {
        errors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.age) {
        errors.age = "Age is required";
    } else if (Number(formData.age) < 18) {
        errors.age = "Age must be at least 18";
    }

    if (!formData.mobileNumber?.trim()) {
        errors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        errors.mobileNumber =
            "Mobile number must contain exactly 10 digits";
    }

    if (formData.whatsappNumber?.trim()) {
        if (!/^\d{10}$/.test(formData.whatsappNumber)) {
            errors.whatsappNumber =
                "WhatsApp number must contain exactly 10 digits";
        }
    }

    if (!formData.status) {
        errors.status = "Profile status is required";
    }

    // Personal Information
    if (!formData.maritalStatus) {
        errors.maritalStatus = "Marital status is required";
    }

    if (!formData.religion?.trim()) {
        errors.religion = "Religion is required";
    }

    if (!formData.caste?.trim()) {
        errors.caste = "Caste is required";
    }

    if (!formData.motherTongue?.trim()) {
        errors.motherTongue = "Mother tongue is required";
    }

    if (formData.weight !== "") {
        if (Number(formData.weight) <= 0) {
            errors.weight = "Weight must be greater than 0";
        }
    }

    // Location Information
    if (!formData.address?.trim()) {
        errors.address = "Address is required";
    }

    if (!formData.district?.trim()) {
        errors.district = "District is required";
    }

    if (!formData.state?.trim()) {
        errors.state = "State is required";
    }

    if (!formData.country?.trim()) {
        errors.country = "Country is required";
    }

    // Education & Career
    if (formData.annualIncome?.trim()) {
        const income = Number(
            formData.annualIncome
                .replace(/,/g, "")
                .replace(/[₹$]/g, "")
        );

        if (income < 0) {
            errors.annualIncome = "Annual income cannot be negative";
        }
    }

    // Family Information
    const siblings = formData.siblings || {};

    const siblingTypes = ["eb", "yb", "es", "ys"];

    siblingTypes.forEach((type) => {
        const total = siblings[type]?.total;
        const married = siblings[type]?.married;

        if (total !== "" && total !== undefined && Number(total) < 0) {
            errors.siblings = {
                ...errors.siblings,
                [type]: {
                    ...errors.siblings?.[type],
                    total: "Total cannot be negative"
                }
            };
        }

        if (married !== "" && married !== undefined && Number(married) < 0) {
            errors.siblings = {
                ...errors.siblings,
                [type]: {
                    ...errors.siblings?.[type],
                    married: "Married count cannot be negative"
                }
            };
        }

        if (
            total !== "" &&
            total !== undefined &&
            married !== "" &&
            married !== undefined &&
            Number(married) > Number(total)
        ) {
            errors.siblings = {
                ...errors.siblings,
                [type]: {
                    ...errors.siblings?.[type],
                    married: "Married count cannot exceed total"
                }
            };
        }
    });

    // About Me
    if (formData.aboutMe?.length > 1000) {
        errors.aboutMe = "About Me cannot exceed 1000 characters";
    }

    // Profile Photos
    if (!formData.profilePhoto) {
        errors.profilePhoto = "Profile photo is required";
    }

    if (formData.additionalPhotos?.length > 4) {
        errors.additionalPhotos =
            "You can upload a maximum of 4 additional photos";
    }

    // Credits
    if (
        formData.credits === "" ||
        formData.credits === null ||
        formData.credits === undefined
    ) {
        errors.credits = "Credits are required";
    } else if (Number(formData.credits) < 0) {
        errors.credits = "Credits cannot be negative";
    }

    return errors;
};