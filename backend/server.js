const express = require("express");
const cors = require("cors");

// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// Import bcryptjs for password hashing
const bcrypt = require("bcryptjs");

// Import jsonwebtoken for JWT token generation
const jwt = require("jsonwebtoken");
// Import cookie-parser for parsing cookies
const cookieParser = require("cookie-parser");






// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully ✅'))
    .catch((err) => {
        console.log('MongoDB Connection Failed ❌', err);
        process.exit(1);  //stop server Because without DB, your API cannot work — better to stop the server.
    });
const app = express();



app.use(express.json());// Middleware to parse JSON request bodies

// CORS configuration
app.use(
    cors({
        // origin: "http://localhost:5173", // your frontend URL
        origin: process.env.FRONTEND_URL, // your frontend URL
        credentials: true,
    })
);

app.use(cookieParser());//This allows you to access cookies using req.cookies.

// 🛑 Handle uncaught exceptions (coding errors)
process.on("uncaughtException", (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    console.log("Shutting down server due to uncaught exception...");
    process.exit(1);
});


// userSchema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    }

},
    {
        // this is to automatically add createdAt and updatedAt fields to the schema in simple terms, it will automatically add the createdAt and updatedAt fields to the schema and update them whenever a document is created or modified.
        timestamps: true
    });

// Create Model
const User = mongoose.model("User", userSchema);

// Profile Schema
const profileSchema = new mongoose.Schema(
    {
        // Unique Profile ID (Example: VTM0001)
        profileId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        // Link to login user account
        userId: {// what this means is that each profile is associated with a specific user in the User collection. The userId field stores the ObjectId of the corresponding user document, creating a reference between the two collections.
            type: mongoose.Schema.Types.ObjectId,// in simple terms, it is a unique identifier for a specific user in the User collection. It allows you to establish a relationship between the Profile and User collections, enabling you to retrieve user information associated with a particular profile.
            ref: "User",
            required: true,
        },

        // Basic Information
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            enum: ["male", "female","Male", "Female"],
            required: true,
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },

        age: {
            type: Number,
            required: true,
            min: 18,
        },

        mobileNumber: {
            type: String,
            required: true,
            match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
        },

        whatsappNumber: {
            type: String,
            match: [/^[6-9]\d{9}$/, "Please enter a valid WhatsApp number"],
        },

        // Personal Information
        height: {
            type: String,
            // required: true,
        },

        weight: {
            type: String,
        },

        maritalStatus: {
            type: String,
            enum: ["Never Married", "Divorced", "Widowed"],
            required: true,
        },

        religion: {
            type: String,
            required: true,
            trim: true,
        },

        caste: {
            type: String,
            required: true,
            trim: true,
        },

        subCaste: {
            type: String,
            trim: true,
        },

        motherTongue: {
            type: String,
            required: true,
            trim: true,
        },

        // Location Information
        address: {
            type: String,
            trim: true,
        },

        district: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            default: "India",
        },

        // Education & Career
        qualification: {
            type: String,
            trim: true,
        },

        occupation: {
            type: String,
            trim: true,
        },

        companyName: {
            type: String,
            trim: true,
        },

        annualIncome: {
            type: String,
            trim: true,
        },

        // Family Information
        fatherName: {
            type: String,
            trim: true,
        },

        fatherOccupation: {
            type: String,
            trim: true,
        },

        motherName: {
            type: String,
            trim: true,
        },

        motherOccupation: {
            type: String,
            trim: true,
        },

        brothers: {
            type: Number,
            default: 0,
            min: 0,
        },

        sisters: {
            type: Number,
            default: 0,
            min: 0,
        },

        // Lifestyle Information
        eatingHabit: {
            type: String,
            enum: ["Vegetarian", "Non-Vegetarian", "Eggetarian"],
        },

        smokingHabit: {
            type: String,
            enum: ["No", "Occasionally", "Regularly"],
            default: "No",
        },

        drinkingHabit: {
            type: String,
            enum: ["No", "Occasionally", "Regularly"],
            default: "No",
        },

        // About Me Section
        aboutMe: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        // Partner Expectations
        partnerExpectations: {
            preferredAge: {
                type: String,
                trim: true,
            },

            preferredEducation: {
                type: String,
                trim: true,
            },

            preferredLocation: {
                type: String,
                trim: true,
            },

            preferredReligion: {
                type: String,
                trim: true,
            },

            preferredCaste: {
                type: String,
                trim: true,
            },
        },

        // Profile Images
        profilePhoto: {
            type: String,
            required: true,
        },

        additionalPhotos: [
            {
                type: String,
            },
        ],

        // Horoscope Image Upload
        horoscopeImage: {
            type: String,
        },

        // Credit System
        credits: {
            type: Number,
            default: 0,
            min: 0,
        },

        // Profile Status
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

// Create Model
const Profile = mongoose.model("Profile", profileSchema);


// ===========================================
// PROFILE VIEW SCHEMA
// ===========================================
const profileViewSchema = new mongoose.Schema(

    {

        // Logged-in user who viewed the profile
        viewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Profile that was viewed
        viewedProfileId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Profile",

            required: true,

        },

        // Date & Time of unlock/view
        viewedAt: {

            type: Date,

            default: Date.now,

        },

    },
    {
        timestamps: true,
    }
);

// ===========================================
// PREVENT DUPLICATE UNLOCKS
// ===========================================
// A user can unlock the same profile only once.
profileViewSchema.index(
    {
        viewerId: 1,
        viewedProfileId: 1
    },
    {
        unique: true
    }
);

// ===========================================
// CREATE MODEL
// ===========================================
const ProfileView = mongoose.model(
    "ProfileView",
    profileViewSchema
);








// AUTHENTICATION MIDDLEWARE this middleware function checks if the user is authenticated by verifying the JWT token stored in the cookies. If the token is valid, it retrieves the user information from the database and attaches it to the request object for use in subsequent middleware or route handlers. If the token is missing, invalid, or expired, it returns a 401 Unauthorized response with an appropriate error message.
const isAuthenticatedUser = async (
    req,
    res,
    next
) => {

    try {

        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                success: false,
                message:
                    "Login first to access this resource",
            });

        }

        // Verify token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        // Get user
        const user =
            await User.findById(
                decoded.userId
            ).select("-password");

        if (!user) {

            return res.status(401).json({
                success: false,
                message:
                    "User not found",
            });

        }

        // Store user in request
        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token",

        });

    }

};

// ADMIN AUTHORIZATION MIDDLEWARE this middleware function checks if the authenticated user has an admin role. It assumes that the isAuthenticatedUser middleware has already been executed and the user information is available in req.user. If the user's role is not "admin", it returns a 403 Forbidden response with an appropriate error message. If the user is an admin, it calls next() to proceed to the next middleware or route handler.
const isAdmin = (
    req,
    res,
    next
) => {

    if (
        req.user.role !== "admin"
    ) {

        return res.status(403).json({

            success: false,

            message:
                "Access denied. Admin only.",

        });

    }

    next();

};



// app.get("/", (req, res) => {
//     res.send("Vetri Matrimony API Running...");
// });


// ✅CREATE DEFAULT ADMIN (RUN ONLY ONCE)
//  Do not delete
// app.post("/seed-admin", async (req, res) => {
//     // this api is to create a default admin user in the database. 
//     // It should be run only once to set up the initial admin account. 
//     // If the admin already exists, it will return an error message. Otherwise, 
//     // it will create the admin user with a predefined username and password.
//     try {
//         // Check if admin already exists
//         const adminExists = await User.findOne({
//             username: "admin",
//         });

//         if (adminExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Admin already exists",
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(
//             "admin123",
//             10
//         );

//         // Create admin user
//         const admin = await User.create({
//             username: "admin",
//             password: hashedPassword,
//             role: "admin",
//         });

//         res.status(201).json({
//             success: true,
//             message: "Admin created successfully",
//             admin: {
//                 username: admin.username,
//                 role: admin.role,
//             },
//         });
//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//         });
//     }
// });



// ✅ LOGIN API (Admin + User)
app.post("/login", async (req, res) => {
    try {
        // Get username and password from request body
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Compare entered password with hashed password
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        // Check if password is incorrect
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Generate JWT token 
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE } // expiry time
        );

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,// Cookie cannot be accessed via JavaScript (XSS protection)
            // secure: true,// Only send cookie over HTTPS only for production, in development you can set it to false or use environment variable to control it
            secure: false,// it is only for development, in production you should set it to true to ensure cookies are only sent over secure HTTPS connections. You can use an environment variable to control this setting based on the environment (development or production).
            // sameSite: "none",// Allow cross-site cookie (needed for frontend-backend on different domains)
            sameSite: "lax",// it provides a balance between security and usability. It allows cookies to be sent with top-level navigations and will block them in third-party contexts, which helps protect against CSRF attacks while still allowing for common use cases.
            maxAge: 7 * 24 * 60 * 60 * 1000//After 7 days → cookie automatically expires → user logged out.
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            role: user.role,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// ===========================================
// ✅ LOGOUT API
// ===========================================
app.post("/logout", (req, res) => {

    // Clear authentication cookie
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });

});



// ✅ CURRENT LOGGED IN USER 
// this will return like admin or user based on the logged in user. It uses the isAuthenticatedUser middleware to ensure that the user is logged in and has a valid JWT token. If the user is authenticated, it returns the user's information (excluding the password) in the response.
app.get("/me", isAuthenticatedUser, async (req, res) => {
    res.status(200).json({
        success: true, user: req.user,
    });
});


// ✅ CREATE PROFILE API (🛡️ADMIN Only)
app.post("/admin/profiles", isAuthenticatedUser,
    isAdmin, async (req, res) => {

        let user;
        try {

            // Get all data from request body
            const {
                username,
                password,

                fullName,
                gender,
                dateOfBirth,
                age,

                mobileNumber,
                whatsappNumber,

                height,
                weight,

                maritalStatus,
                religion,
                caste,
                subCaste,
                motherTongue,

                address,
                district,
                state,
                country,

                qualification,
                occupation,
                companyName,
                annualIncome,

                fatherName,
                fatherOccupation,

                motherName,
                motherOccupation,

                brothers,
                sisters,

                eatingHabit,
                smokingHabit,
                drinkingHabit,

                aboutMe,

                partnerExpectations,

                profilePhoto,
                additionalPhotos,

                horoscopeImage,

                credits = 0,

            } = req.body;

            // ============================
            // Validate required fields
            // ============================
            if (
                !username ||
                !password ||
                !fullName ||
                !gender ||
                !dateOfBirth ||
                !age ||
                !mobileNumber ||
                !district ||
                !profilePhoto
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Please fill all required fields",
                });
            }

            // ============================
            // Check username exists
            // ============================
            const existingUser = await User.findOne({
                username,
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists",
                });
            }

            // ============================
            // Check duplicate profile if same full name, DOB and mobile number exists that means same person is trying to create multiple profiles
            // ============================
            const duplicateProfile =
                await Profile.findOne({
                    fullName,
                    dateOfBirth,
                    mobileNumber,
                });

            if (duplicateProfile) {
                return res.status(400).json({
                    success: false,
                    message: "Profile already exists",
                });
            }

            // ============================
            // Hash password
            // ============================
            const hashedPassword =
                await bcrypt.hash(password, 10);

            // ============================
            // Create User
            // ============================
            const user = await User.create({
                username,
                password: hashedPassword,
                role: "user",
            });

            // ============================
            // Generate Profile ID
            // ============================
            const latestProfile =
                await Profile.findOne()
                    .sort({ createdAt: -1 });

            let profileId = "VTM0001";

            if (latestProfile) {

                const lastNumber =
                    parseInt(
                        latestProfile.profileId
                            .replace("VTM", "")
                    );

                profileId =
                    "VTM" +
                    String(lastNumber + 1)
                        .padStart(4, "0");
            }

            // ============================
            // Create Profile
            // ============================
            const profile =
                await Profile.create({

                    profileId,

                    userId: user._id,

                    fullName,
                    gender,
                    dateOfBirth,
                    age,

                    mobileNumber,
                    whatsappNumber,

                    height,
                    weight,

                    maritalStatus,
                    religion,
                    caste,
                    subCaste,
                    motherTongue,

                    address,
                    district,
                    state,
                    country,

                    qualification,
                    occupation,

                    companyName,
                    annualIncome,

                    fatherName,
                    fatherOccupation,

                    motherName,
                    motherOccupation,

                    brothers,
                    sisters,

                    eatingHabit, smokingHabit, drinkingHabit,

                    aboutMe,

                    partnerExpectations,

                    profilePhoto,
                    additionalPhotos,

                    horoscopeImage,

                    credits,

                });

            // ============================
            // Success Response
            // ============================
            res.status(201).json({
                success: true,
                message:
                    "Profile created successfully",
                profileId:
                    profile.profileId,
            });

        } catch (error) {
            // Rollback user creation
            if (user) {
                await User.findByIdAndDelete(user._id);
            }

            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });


// ✅ GET ALL PROFILES (🛡️ADMIN Only)
app.get("/admin/profiles", isAuthenticatedUser,
    isAdmin, async (req, res) => {
        // this API is to get all profiles with pagination 
        // and search functionality. It uses the isAuthenticatedUser and 
        // isAdmin middleware to ensure that only authenticated admin users
        // can access this endpoint. The API accepts query parameters for 
        // pagination (page and limit) and search (search). 
        // It retrieves the profiles from the database based on the search criteria
        // and returns them in a paginated format along with pagination
        // metadata such as current page, total pages, total profiles, and limit.

        try {

            // Get query parameters
            let {
                page = 1,
                limit = 10,
                search = ""
            } = req.query;

            // Convert page and limit to number
            page = Number(page);
            limit = Number(limit);

            // Calculate skip value
            const skip = (page - 1) * limit;

            // Search filter
            const filter = {};

            if (search) {

                filter.$or = [

                    // Search by Profile ID
                    {
                        profileId: {
                            $regex: search,
                            $options: "i"
                        }
                    },

                    // Search by Full Name
                    {
                        fullName: {
                            $regex: search,
                            $options: "i"
                        }
                    },

                    // Search by Mobile Number
                    {
                        mobileNumber: {
                            $regex: search,
                            $options: "i"
                        }
                    }

                ];

            }

            // Get profiles
            const profiles = await Profile.find(filter)
                .select(
                    "profileId profilePhoto fullName gender credits status"
                )
                // Newest first
                .sort({
                    createdAt: -1
                })
                // Pagination
                .skip(skip)
                // 
                .limit(limit);

            // Count total profiles
            const totalProfiles =
                await Profile.countDocuments(filter);

            // Calculate total pages
            const totalPages =
                Math.ceil(
                    totalProfiles / limit
                );

            // Response
            res.status(200).json({

                success: true,

                profiles,

                pagination: {

                    currentPage: page,

                    totalPages,

                    totalProfiles,

                    limit,

                }

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Internal server error",

            });

        }
    });


// ✅ GET SINGLE PROFILE (🛡️ADMIN Only)
// this API is to get a single profile by its ID.
app.get("/admin/profiles/:id", isAuthenticatedUser, isAdmin, async (req, res) => {
    // this API is to get a single profile by its ID. 
    // It uses the isAuthenticatedUser and isAdmin middleware to ensure 
    // that only authenticated admin users can access this endpoint. 
    // The profile is retrieved from the database using the provided ID, 
    // and the user details are populated from the User collection. If the 
    // profile is found, it returns the profile data in the response; otherwise, 
    // it returns a 404 error if the profile is not found or a 500 error for any internal server issues.
    try {

        // Get profile id from URL
        const { id } = req.params;

        // Find profile by MongoDB _id
        // why this does not provide password? Because we are not selecting the password field in the populate method. We are only selecting username, role, and createdAt fields from the User collection. The password field is not included in the response for security reasons.
        const profile = await Profile.findById(id)
            .populate( // Populate user details from User collection why? Because Profile has a reference to User via userId
                "userId",
                "username role createdAt"
            );

        // Check profile exists
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            profile
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
);


// ✅ UPDATE PROFILE API (🛡️ADMIN Only)
app.put("/admin/profiles/:id", isAuthenticatedUser, isAdmin, async (req, res) => {

    try {

        // ===========================================
        // Get Profile ID From URL
        // ===========================================
        const { id } = req.params;
        // ===========================================
        // Validate MongoDB ObjectId
        // ===========================================
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid profile id",

            });

        }
        // ===========================================
        // Get Data From Request Body
        // ===========================================
        const {

            username,
            password,

            fullName,
            gender,
            dateOfBirth,
            age,

            mobileNumber,
            whatsappNumber,

            height,
            weight,

            maritalStatus,

            religion,
            caste,
            subCaste,

            motherTongue,

            address,
            district,
            state,
            country,

            qualification,
            occupation,
            companyName,
            annualIncome,

            fatherName,
            fatherOccupation,

            motherName,
            motherOccupation,

            brothers,
            sisters,

            eatingHabit,
            smokingHabit,
            drinkingHabit,

            aboutMe,

            partnerExpectations,

            profilePhoto,
            additionalPhotos,
            horoscopeImage,

            credits,

            status,

        } = req.body;

        // ===========================================
        // Find Profile
        // ===========================================
        const profile =
            await Profile.findById(id);

        if (!profile) {

            return res.status(404).json({

                success: false,

                message: "Profile not found",

            });

        }

        // ===========================================
        // Find User Using userId
        // ===========================================
        const user =
            await User.findById(
                profile.userId
            );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        // ===========================================
        // Check Duplicate Username
        // Only If Username Changed
        // CORRECTED: Added _id exclusion so the
        // check never matches the current user's
        // own document (defensive safety, in case
        // this block is ever reused without the
        // prior !== guard).
        // ===========================================
        if (
            username &&
            username !== user.username
        ) {

            const usernameExists =
                await User.findOne({
                    username,
                    _id: { $ne: user._id },
                });

            if (usernameExists) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Username already exists",

                });

            }

        }

        // ===========================================
        // PART - 2 STARTS HERE
        // ===========================================

        // ===========================================
        // SAVE OLD USER DATA (For Rollback)
        // CORRECTED (Bug 1): This must happen BEFORE
        // user.username / user.password are mutated.
        // Previously these were captured AFTER the
        // update, so oldUsername/oldPassword held the
        // NEW values, not the originals — rollback was
        // a no-op.
        // ===========================================
        const oldUsername = user.username;
        const oldPassword = user.password;

        // ===========================================
        // UPDATE USER COLLECTION
        // CORRECTED: Removed the redundant
        // hashedPassword/user.password reassignment
        // that ran even when no new password was
        // submitted. Password is now only touched
        // inside the if-block below.
        // ===========================================

        // Update username
        // CORRECTED (Bug 2): Reject whitespace-only
        // usernames (e.g. "   ") by trimming before
        // the check, and store the trimmed value.
        if (
            username &&
            username.trim() !== ""
        ) {

            user.username = username.trim();

        }

        // Hash and update password only if admin entered a new password
        if (
            password &&
            password.trim() !== ""
        ) {

            user.password =
                await bcrypt.hash(
                    password,
                    10
                );

        }

        // ===========================================
        // UPDATE PROFILE COLLECTION
        // ===========================================

        profile.fullName = fullName ?? profile.fullName;

        profile.gender = gender ?? profile.gender;

        profile.dateOfBirth = dateOfBirth ?? profile.dateOfBirth;

        profile.age = age ?? profile.age;

        profile.mobileNumber = mobileNumber ?? profile.mobileNumber;

        profile.whatsappNumber = whatsappNumber ?? profile.whatsappNumber;

        profile.height = height ?? profile.height;

        profile.weight = weight ?? profile.weight;

        profile.maritalStatus = maritalStatus ?? profile.maritalStatus;

        profile.religion = religion ?? profile.religion;

        profile.caste = caste ?? profile.caste;

        profile.subCaste = subCaste ?? profile.subCaste;

        profile.motherTongue = motherTongue ?? profile.motherTongue;

        profile.address = address ?? profile.address;

        profile.district = district ?? profile.district;

        profile.state = state ?? profile.state;

        profile.country = country ?? profile.country;

        profile.qualification = qualification ?? profile.qualification;

        profile.occupation = occupation ?? profile.occupation;

        profile.companyName = companyName ?? profile.companyName;

        profile.annualIncome = annualIncome ?? profile.annualIncome;

        profile.fatherName = fatherName ?? profile.fatherName;

        profile.fatherOccupation =
            fatherOccupation ?? profile.fatherOccupation;

        profile.motherName = motherName ?? profile.motherName;

        profile.motherOccupation =
            motherOccupation ?? profile.motherOccupation;

        profile.brothers = brothers ?? profile.brothers;

        profile.sisters = sisters ?? profile.sisters;

        profile.eatingHabit =
            eatingHabit ?? profile.eatingHabit;

        profile.smokingHabit =
            smokingHabit ?? profile.smokingHabit;

        profile.drinkingHabit =
            drinkingHabit ?? profile.drinkingHabit;

        profile.aboutMe =
            aboutMe ?? profile.aboutMe;

        // ===========================================
        // UPDATE PARTNER EXPECTATIONS
        // IMPROVEMENT: Only merge if partnerExpectations
        // is actually an object, so a bad request like
        // { "partnerExpectations": "hello" } can't slip
        // through and corrupt the field.
        // ===========================================

        if (
            partnerExpectations &&
            typeof partnerExpectations === "object"
        ) {

            profile.partnerExpectations = {

                ...profile.partnerExpectations,

                ...partnerExpectations,

            };

        }

        // ===========================================
        // UPDATE PROFILE IMAGES
        // ===========================================

        profile.profilePhoto =
            profilePhoto ?? profile.profilePhoto;

        profile.additionalPhotos =
            additionalPhotos ?? profile.additionalPhotos;

        profile.horoscopeImage =
            horoscopeImage ?? profile.horoscopeImage;

        // ===========================================
        // UPDATE CREDITS
        // CORRECTED: Switched to the same ??
        // pattern used everywhere else, so behavior
        // is consistent across all fields.
        // ===========================================

        profile.credits = credits ?? profile.credits;

        // ===========================================
        // UPDATE STATUS
        // IMPROVEMENT: Check against undefined instead
        // of truthy, so an intentional empty string or
        // a future falsy-but-valid enum value still
        // gets applied.
        // ===========================================

        if (status !== undefined) {
            profile.status = status;
        }

        // ===========================================
        // PART - 3 STARTS HERE
        // ===========================================

        try {

            // ===========================================
            // SAVE USER COLLECTION
            // ===========================================
            await user.save();

            // ===========================================
            // SAVE PROFILE COLLECTION
            // ===========================================
            await profile.save();

            // ===========================================
            // GET UPDATED PROFILE
            // ===========================================
            const updatedProfile = await Profile.findById(profile._id)
                .populate(
                    "userId",
                    "username role createdAt"
                );

            // ===========================================
            // SUCCESS RESPONSE
            // ===========================================
            return res.status(200).json({

                success: true,

                message: "Profile updated successfully",

                profile: updatedProfile,

            });

        } catch (error) {

            // ===========================================
            // ROLLBACK USER UPDATE
            // ===========================================
            try {

                user.username = oldUsername;
                user.password = oldPassword;

                await user.save();

            } catch (rollbackError) {

                console.error(
                    "Rollback Failed:",
                    rollbackError
                );

            }

            console.error(error);

            return res.status(500).json({

                success: false,

                message: "Failed to update profile",

                error: error.message,

            });

        }

    } catch (outerError) {

        console.error(outerError);

        return res.status(500).json({

            success: false,

            message: "Something went wrong",
            error: outerError.message

        });

    }

}

);



// ✅UPDATE PROFILE STATUS API (🛡️ADMIN Only)
app.patch("/admin/profiles/:id/status", isAuthenticatedUser, isAdmin,
    async (req, res) => {

        // purpose of this API is to update the status of a profile (active or inactive). It uses the isAuthenticatedUser and isAdmin middleware to ensure that only authenticated admin users can access this endpoint. The profile ID is obtained from the URL parameters, and the new status is obtained from the request body. The API validates the profile ID, 
        // checks if the profile exists, and updates the status accordingly. If successful, it returns a success response with the updated profile information; otherwise, it returns appropriate error messages for invalid input or internal server errors.
        try {

            // ===========================================
            // Get Profile ID
            // ===========================================
            const { id } = req.params;

            // ===========================================
            // Validate MongoDB ObjectId
            // ===========================================
            if (!mongoose.Types.ObjectId.isValid(id)) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid profile id",

                });

            }

            // ===========================================
            // Get Status From Request Body
            // ===========================================
            const { status } = req.body;

            // ===========================================
            // Validate Status
            // ===========================================
            if (!status) {

                return res.status(400).json({

                    success: false,

                    message: "Status is required",

                });

            }

            // Allow only active or inactive
            if (
                status !== "active" &&
                status !== "inactive"
            ) {

                return res.status(400).json({

                    success: false,

                    message: "Status must be active or inactive",

                });

            }

            // ===========================================
            // Find Profile
            // ===========================================
            const profile =
                await Profile.findById(id);

            if (!profile) {

                return res.status(404).json({

                    success: false,

                    message: "Profile not found",

                });

            }

            // ===========================================
            // Update Status
            // ===========================================
            profile.status = status;

            await profile.save();

            // ===========================================
            // Success Response
            // ===========================================
            return res.status(200).json({

                success: true,

                message: "Profile status updated successfully",

                profile: {

                    profileId: profile.profileId,

                    fullName: profile.fullName,

                    status: profile.status,

                }

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message: "Failed to update profile status",

                error: error.message,

            });

        }

    }
);


// ✅ ADD CREDITS API (🛡️ADMIN Only)
app.patch("/admin/profiles/:id/credits", isAuthenticatedUser, isAdmin,
    async (req, res) => {
        // this API is to add credits to a profile. It uses the isAuthenticatedUser 
        // and isAdmin middleware to ensure that only authenticated admin users can
        //  access this endpoint. The profile ID is obtained from the URL parameters,
        //  and the number of credits to add is obtained from the request body. 
        // The API validates the profile ID, checks if the profile exists, and adds
        //  the specified number of credits to the profile's existing credits. 
        // If successful, it returns a success response with the updated profile 
        // information; otherwise, it returns appropriate error messages for invalid input or internal server errors.
        try {

            // ===========================================
            // Get Profile ID
            // ===========================================
            const { id } = req.params;

            // ===========================================
            // Validate MongoDB ObjectId
            // ===========================================
            if (!mongoose.Types.ObjectId.isValid(id)) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid profile id",

                });

            }

            // ===========================================
            // Get Credits To Add
            // ===========================================
            const { credits } = req.body;

            // ===========================================
            // Validate Credits
            // ===========================================
            if (credits === undefined) {

                return res.status(400).json({

                    success: false,

                    message: "Credits are required",

                });

            }

            if (
                typeof credits !== "number" ||
                credits <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message: "Credits must be greater than 0",

                });

            }

            // ===========================================
            // Find Profile
            // ===========================================
            const profile =
                await Profile.findById(id);

            if (!profile) {

                return res.status(404).json({

                    success: false,

                    message: "Profile not found",

                });

            }

            // ===========================================
            // Add Credits
            // ===========================================
            profile.credits += credits;

            await profile.save();

            // ===========================================
            // Success Response
            // ===========================================
            return res.status(200).json({

                success: true,

                message: "Credits added successfully",

                profile: {

                    profileId: profile.profileId,

                    fullName: profile.fullName,

                    credits: profile.credits,

                }

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message: "Failed to add credits",

                error: error.message,

            });

        }

    }
);


// ✅ DELETE PROFILE API (🛡️ADMIN Only)
app.delete("/admin/profiles/:id", isAuthenticatedUser, isAdmin,
    // this API is to delete a profile and its linked user. It uses the isAuthenticatedUser and isAdmin middleware to ensure that only authenticated admin users can access this endpoint. The profile ID is obtained from the URL parameters. The API validates the profile ID, checks if the profile exists, and then deletes both the profile and the linked user from the database. If successful, it returns a success response; otherwise, it returns appropriate error messages for invalid input or internal server errors. 
    async (req, res) => {

        try {

            // ===========================================
            // Get Profile ID
            // ===========================================
            const { id } = req.params;

            // ===========================================
            // Validate MongoDB ObjectId
            // ===========================================
            if (!mongoose.Types.ObjectId.isValid(id)) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid profile id",

                });

            }

            // ===========================================
            // Find Profile
            // ===========================================
            const profile = await Profile.findById(id);

            if (!profile) {

                return res.status(404).json({

                    success: false,

                    message: "Profile not found",

                });

            }

            // ===========================================
            // Find Linked User
            // ===========================================
            const user = await User.findById(profile.userId);

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "User not found",

                });

            }

            // ===========================================
            // Delete User and Profile
            const deletedUser = await User.findByIdAndDelete(user._id);

            // ===========================================
            // Check if user was deleted
            if (!deletedUser) {

                return res.status(500).json({

                    success: false,

                    message: "Failed to delete user",

                });

            }

            // this will delete the profile from the database using the profile's _id. It will also delete the linked user from the User collection using the userId field in the Profile collection. If both deletions are successful, it will return a success response with a message indicating that the profile was deleted successfully. If either deletion fails, it will return an error response with an appropriate message.
            await Profile.findByIdAndDelete(profile._id);

            // ===========================================
            // Success Response
            // ===========================================
            return res.status(200).json({

                success: true,

                message: "Profile deleted successfully",

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message: "Failed to delete profile",

                error: error.message,

            });

        }

    }
);




// ✅ GET PUBLIC PROFILES API 
app.get("/public/profiles", async (req, res) => {
    // this API is to get all public profiles with pagination. 
    // It retrieves only the active profiles from the database and 
    // returns them in a paginated format along with pagination 
    // metadata such as current page, total pages, total profiles, 
    // and limit. The API accepts query parameters for pagination (page and limit) 
    // and returns only the name and profile photo of each profile.    
    try {

        // ===========================================
        // Get Query Parameters
        // ===========================================

        const page = Number(req.query.page) || 1;

        // for protection
        // const limit = Number(req.query.limit) || 8;

        // for testing
        const limit = Number(req.query.limit) || 3;

        // Search Filters
        const gender = req.query.gender;
        const religion = req.query.religion;
        const caste = req.query.caste;

        const ageFrom = Number(req.query.ageFrom);
        const ageTo = Number(req.query.ageTo);

        // Skip Records
        const skip = (page - 1) * limit;

        // ===========================================
        // Build Search Filter
        // ===========================================

        const filter = {

            status: "active"

        };

        // Gender
        if (gender && gender !== "All") {

            filter.gender = gender;

        }

        if (religion && religion !== "All") {

            filter.religion = religion;

        }

        // Caste
        if (caste && caste !== "All") {

            filter.caste = caste;

        }

        // Age
        if (!isNaN(ageFrom) && !isNaN(ageTo)) {

            filter.age = {

                $gte: ageFrom,

                $lte: ageTo

            };

        }

        // ===========================================
        // Total Matching Profiles
        // ===========================================

        const totalProfiles = await Profile.countDocuments(filter);



        // ===========================================
        // Get Matching Profiles
        // Only Public Information
        // ===========================================

        const profiles = await Profile.find(

            filter,

            {

                fullName: 1,

                profilePhoto: 1,

                age: 1,

                religion: 1,

                caste: 1,

                district: 1,

                occupation: 1,

                qualification: 1,

                status: 1

            }

        )

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        // ===========================================
        // Success Response
        // ===========================================
        return res.status(200).json({

            success: true,

            currentPage: page,

            totalPages: Math.ceil(totalProfiles / limit),

            totalProfiles,

            profiles,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch profiles",

            error: error.message,

        });

    }

}
);


// ===========================================
// ✅ GET PROFILES (LOGGED-IN USER)
// ===========================================
app.get("/profiles", isAuthenticatedUser, async (req, res) => {
    // this API is to get all profiles for a logged-in user with pagination. It uses the isAuthenticatedUser middleware to ensure that only authenticated users can access this endpoint. The API retrieves the profiles from the database based on the logged-in user's ID and returns them in a paginated format along with pagination metadata such as current page, total pages, total profiles, and limit. The API accepts query parameters for pagination (page and limit) and returns only the name, profile photo, age, gender, religion, caste
    try {

        // ===========================================
        // Get Query Parameters
        // ===========================================
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;
        // const limit = Number(req.query.limit) || 3;

        const skip = (page - 1) * limit;

        const {

    search,

    gender,

    ageFrom,

    ageTo,

    religion,

    caste,

    district

} = req.query;

        // ===========================================
        // Build Filter Query
        // ===========================================
        const filter = {

            status: "active",

            // Don't show logged-in user's own profile
            userId: {

                $ne: req.user._id

            }

        };

// ===========================================
// Search By Profile ID OR Full Name
// ===========================================
if (search) {

    filter.$or = [

        {

            profileId: {

                $regex: search,

                $options: "i"

            }

        },

        {

            fullName: {

                $regex: search,

                $options: "i"

            }

        }

    ];

}

 

        // ===========================================
        // Gender
        // ===========================================
        if (gender) {

            filter.gender = gender;

        }

        // ===========================================
        // Religion
        // ===========================================
        if (religion) {

            filter.religion = religion;

        }

        // ===========================================
        // Caste
        // ===========================================
        if (caste) {

            filter.caste = caste;

        }

        // ===========================================
        // District
        // ===========================================
        if (district) {

            filter.district = {

                $regex: district,

                $options: "i"

            };

        }

        // ===========================================
        // Age Range
        // ===========================================
        if (ageFrom || ageTo) {

            filter.age = {};

            if (ageFrom) {

                filter.age.$gte = Number(ageFrom);

            }

            if (ageTo) {

                filter.age.$lte = Number(ageTo);

            }

        }

        // ===========================================
        // Total Profiles
        // ===========================================
        const totalProfiles = await Profile.countDocuments(filter);

        // ===========================================
        // Get Profiles
        // ===========================================
        const profiles = await Profile.find(

            filter,

            {

                profileId: 1,

                fullName: 1,

                age: 1,

                district: 1,

                profilePhoto: 1,

                gender: 1,

                religion: 1,

                caste: 1

            }

        )

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        // ===========================================
        // Success Response
        // ===========================================
        return res.status(200).json({

            success: true,

            currentPage: page,

            totalPages: Math.ceil(totalProfiles / limit),

            totalProfiles,

            profiles

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch profiles",

            error: error.message

        });

    }

});



// Every profile unlock costs 1 credit
const UNLOCK_CREDIT_COST = 1;

// ✅ UNLOCK PROFILE API using credits (LOGGED-IN USER)
app.post("/profiles/:id/unlock", isAuthenticatedUser, async (req, res) => {
    // this API is to unlock a profile for a logged-in user.
    //  It uses the isAuthenticatedUser middleware to ensure 
    // that only authenticated users can access this endpoint. 
    // The API retrieves the profile to be unlocked using the provided ID,
    //  checks if the logged-in user has enough credits, and deducts the
    //  required credits from the user's profile. It also creates a record 
    // of the profile view in the ProfileView collection. If successful, it 
    // returns a success response with the remaining credits; otherwise, 
    // it returns appropriate error messages for invalid input or insufficient credits.
    try {

        // ===========================================
        // Get Profile ID From URL
        // ===========================================
        const { id } = req.params;

        // ===========================================
        // Validate MongoDB ObjectId
        // ===========================================
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid profile id"

            });

        }

        // ===========================================
        // Find Profile To Unlock
        // ===========================================
        const profileToUnlock = await Profile.findById(id);

        if (!profileToUnlock) {

            return res.status(404).json({

                success: false,

                message: "Profile not found"

            });

        }

        // ===========================================
        // Find Logged-in User Profile
        // Credits are stored in Profile collection
        // ===========================================
        const myProfile = await Profile.findOne({

            userId: req.user._id

        });

        if (!myProfile) {

            return res.status(404).json({

                success: false,

                message: "Your profile not found"

            });

        }

        // ===========================================
        // User Cannot Unlock Own Profile
        // ===========================================
        if (

            profileToUnlock.userId.toString() ===
            req.user._id.toString()

        ) {

            return res.status(400).json({

                success: false,

                message: "You cannot unlock your own profile"

            });

        }

        // ===========================================
        // Check Whether Already Unlocked
        // ===========================================
        const alreadyUnlocked = await ProfileView.findOne({

            viewerId: req.user._id,

            viewedProfileId: profileToUnlock._id

        });

        if (alreadyUnlocked) {

            return res.status(200).json({

                success: true,

                message: "Profile already unlocked",

                remainingCredits: myProfile.credits

            });

        }

        // ===========================================
        // Check User Credits
        // ===========================================
        if (

            myProfile.credits < UNLOCK_CREDIT_COST

        ) {

            return res.status(400).json({

                success: false,

                message: "Not enough credits"

            });

        }

        // ===========================================
        // Save Current Credits
        // Needed For Rollback
        // ===========================================
        const oldCredits = myProfile.credits;

        // ===========================================
        // PART - 2 STARTS HERE
        // ===========================================
        // ===========================================
        // DEDUCT USER CREDITS
        // ===========================================
        myProfile.credits -= UNLOCK_CREDIT_COST;

        try {

            // ===========================================
            // SAVE UPDATED CREDITS
            // ===========================================
            await myProfile.save();

            // ===========================================
            // CREATE PROFILE VIEW RECORD
            // ===========================================
            await ProfileView.create({

                viewerId: req.user._id,

                viewedProfileId: profileToUnlock._id,

            });

            // ===========================================
            // PART - 3 STARTS HERE
            // ===========================================

        } catch (error) {

            // ===========================================
            // ROLLBACK USER CREDITS
            // ===========================================
            try {

                myProfile.credits = oldCredits;

                await myProfile.save();

            } catch (rollbackError) {

                console.error(
                    "Credit Rollback Failed:",
                    rollbackError
                );

            }

            console.error(error);

            return res.status(500).json({

                success: false,

                message: "Failed to unlock profile",

                error: error.message,

            });

        }
        // ===========================================
        // SUCCESS RESPONSE
        // ===========================================
        return res.status(200).json({

            success: true,

            message: "Profile unlocked successfully",

            remainingCredits: myProfile.credits,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to unlock profile",

            error: error.message,

        });

    }

}
);




// ===========================================
// ✅ GET SINGLE PROFILE (FULL DETAILS) after unlock profile using credits (LOGGED-IN USER)
// ===========================================
app.get("/profiles/:id", isAuthenticatedUser, async (req, res) => {
    // this API is to get the full details of a single profile for a logged-in user. It uses the isAuthenticatedUser middleware to ensure that only authenticated users can access this endpoint. 
    // The API retrieves the profile using the provided ID, checks if the logged-in user is viewing their own profile or if they have unlocked the profile, and returns the full profile details accordingly. If successful, it returns a success response with the profile information; otherwise, it returns appropriate error messages for invalid input or unauthorized access.
    try {

        // ===========================================
        // Get Profile ID
        // ===========================================
        const { id } = req.params;

        // ===========================================
        // Validate MongoDB ObjectId
        // ===========================================
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid profile id"

            });

        }

        // Find Profile
        // why select("-__v")? because we don't want to return the __v field in the response. The __v field is a version key that is automatically added by Mongoose to track document revisions. It is not needed in the API response, so we exclude it using select("-__v").
        const profile = await Profile.findById(id).select("-__v");

        if (!profile) {

            return res.status(404).json({

                success: false,

                message: "Profile not found"

            });

        }

        // ===========================================
        // If User Is Viewing Own Profile
        // Allow Direct Access
        // ===========================================
        if (

            profile.userId.toString() ===
            req.user._id.toString()

        ) {

            return res.status(200).json({

                success: true,

                profile

            });

        }

        // ===========================================
        // Check Whether Profile Is Unlocked
        // ===========================================
        const unlocked = await ProfileView.findOne({

            viewerId: req.user._id,

            viewedProfileId: profile._id

        });

        // ===========================================
        // Not Unlocked
        // ===========================================
        if (!unlocked) {

            return res.status(403).json({

                success: false,

                message: "Please unlock this profile first."

            });

        }

        // ===========================================
        // Return Full Profile
        // ===========================================
        return res.status(200).json({

            success: true,

            profile

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch profile",

            error: error.message

        });

    }

}
);



// ===========================================
// ✅ GET MY UNLOCKED PROFILES API
// ===========================================
app.get("/user/unlocked-profiles", isAuthenticatedUser, async (req, res) => {
    // this API is to get all profiles that a logged-in user has unlocked. It uses the isAuthenticatedUser middleware to ensure that only authenticated users can access this endpoint. The API retrieves the unlocked profiles from the ProfileView collection, filters out any deleted or inactive profiles, and returns them in a paginated format along with pagination metadata such as current page, total pages, total profiles, and limit. The API accepts query parameters for pagination (page and limit) and returns the full details of each unlocked profile.
    try {

        // ===========================================
        // Get Page & Limit
        // ===========================================
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // ===========================================
        // Count Total Unlocked Profiles
        // ===========================================
        const totalProfiles = await ProfileView.countDocuments({

            viewerId: req.user._id

        });

        // ===========================================
        // Get Unlocked Profile Records
        // ===========================================
        const unlockedProfiles = await ProfileView.find({

            viewerId: req.user._id

        })
            // why use populate? Your ProfileView collection stores only IDs: MongoDB automatically fetches the corresponding profile details, so you don't need to manually query the Profile collection again.
            .populate({

                path: "viewedProfileId",

                select: "fullName age district profilePhoto profileId status"

            })

            .sort({

                createdAt: -1

            })

            .skip(skip)

            .limit(limit);

        // ===========================================
        // Remove Deleted/Inactive Profiles
        // ===========================================
        const profiles = unlockedProfiles
            .map(item => item.viewedProfileId)
            .filter(profile => profile && profile.status === "active");

        // ===========================================
        // Success Response
        // ===========================================
        return res.status(200).json({

            success: true,

            currentPage: page,

            totalPages: Math.ceil(totalProfiles / limit),

            totalProfiles,

            profiles

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch unlocked profiles",

            error: error.message

        });

    }

}
);



// ===========================================
// ✅ GET MY PROFILE details API
// ===========================================
app.get("/user/profile", isAuthenticatedUser, async (req, res) => {
    // this API is to get the profile of the logged-in user. It uses the isAuthenticatedUser middleware to ensure that only authenticated users can access this endpoint. The API retrieves the profile associated with the logged-in user's ID and returns it along with basic user information such as ID, username, and role. If successful, it returns a success response with the profile details; otherwise, it returns appropriate error messages for invalid input or internal server errors.
    try {

        // ===========================================
        // Find Logged-in User Profile
        // ===========================================
        const profile = await Profile.findOne({

            userId: req.user._id

        });

        // ===========================================
        // Check Profile Exists
        // ===========================================
        if (!profile) {

            return res.status(404).json({

                success: false,

                message: "Profile not found"

            });

        }

        // ===========================================
        // Success Response
        // ===========================================
        return res.status(200).json({

            success: true,

            user: {

                id: req.user._id,

                username: req.user.username,

                role: req.user.role

            },

            profile

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch your profile",

            error: error.message

        });

    }

}
);



// --- Server Start ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
});


// 🛑 Handle unhandled promise rejections (DB errors, async fails)
process.on("unhandledRejection", (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    console.log("Shutting down server due to unhandled promise rejection...");

    server.close(() => {
        process.exit(1);
    });
});