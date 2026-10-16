import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../../context/AuthContext";
// CSS
import "../../assets/css/public/Login.css";

// Images
import logo from "../../assets/images/logo.png";
import coupleImage from "../../assets/images/couple.png";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    // ==========================
    // Form State
    // ==========================

    const [formData, setFormData] = useState({

        username: "",

        password: ""

    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    // ==========================
    // Handle Input Change
    // ==========================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ==========================
    // Handle Login
    // ==========================

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Please enter username";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Please enter password";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            const data = await login(formData);

            if (data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }
        } catch (error) {
            setErrors({
                general:
                    error.response?.data?.message ||
                    "Login failed. Please check your username and password."
            });
        } finally {
            setLoading(false);
        }
    };

    return (

        <section className="login-page">

            <div className="login-container">

                {/* LEFT PANEL */}

                <div className="login-left">

                    <img

                        src={logo}

                        alt="Vetri Matrimony"

                        className="login-logo"

                    />

                    <h2>

                        Helping you find the

                        <br />

                        perfect life partner

                    </h2>

                    <img

                        src={coupleImage}

                        alt="Couple"

                        className="couple-image"

                    />

                    <div className="login-features">

                        <div className="feature-item">

                            <i className="bi bi-shield-check"></i>

                            <span>Trusted Platform</span>

                        </div>

                        <div className="feature-item">

                            <i className="bi bi-patch-check"></i>

                            <span>Verified Profiles</span>

                        </div>

                        <div className="feature-item">

                            <i className="bi bi-lock"></i>

                            <span>Secure & Safe</span>

                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="login-right">

                    <h1>Welcome Back!</h1>

                    <p>

                        Login to access your account

                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Username */}

                        <div className="input-group">

                            <label>

                                Username

                            </label>

                            <div className="input-box">

                                <i className="bi bi-person"></i>

                                <input

                                    type="text"

                                    name="username"

                                    placeholder="Enter your username"

                                    value={formData.username}

                                    onChange={handleChange}

                                />
                                {errors.username && (
                                    <small className="login-error">
                                        {errors.username}
                                    </small>
                                )}

                            </div>

                        </div>
                        {/* Password */}

                        <div className="input-group">

                            <label>

                                Password

                            </label>

                            <div className="input-box">

                                <i className="bi bi-lock"></i>

                                <input

                                    type={showPassword ? "text" : "password"}

                                    name="password"

                                    placeholder="Enter your password"

                                    value={formData.password}

                                    onChange={handleChange}

                                />
                                {errors.password && (
                                    <small className="login-error">
                                        {errors.password}
                                    </small>
                                )}

                                <button

                                    type="button"

                                    className="password-toggle"

                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }

                                >

                                    <i

                                        className={`bi ${showPassword

                                            ? "bi-eye-slash"

                                            : "bi-eye"

                                            }`}

                                    ></i>

                                </button>

                            </div>

                        </div>

                        {/* Forgot Username / Password */}

                        <div className="forgot-password">

                            <span>

                                Forgot Username / Password?<span> </span>
                                <Link to="/contact-us">

                                    Contact Admin

                                </Link>
                            </span>



                        </div>

                        {/* Login Button */}
                        {errors.general && (
                            <div className="login-general-error">
                                <i className="bi bi-exclamation-circle"></i>
                                {errors.general}
                            </div>
                        )}
                        <button

                            type="submit"

                            className="login-btn"

                            disabled={loading}

                        >

                            {

                                loading ?

                                    (

                                        <>

                                            <span

                                                className="spinner-border spinner-border-sm me-2"

                                            ></span>

                                            Logging in...

                                        </>

                                    )

                                    :

                                    (

                                        <>

                                            <i className="bi bi-box-arrow-in-right me-2"></i>

                                            Login

                                        </>

                                    )

                            }

                        </button>

                    </form>

                    {/* Divider */}

                    <div className="login-divider">

                        <span>OR</span>

                    </div>


                    {/* Footer */}

                    <div className="login-footer">
                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Register Now
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    );

}

export default Login;