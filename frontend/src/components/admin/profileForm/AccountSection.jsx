import { useState } from "react";

import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function AccountSection({
    formData,
    errors,
    handleChange,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SectionCard
            number="11"
            title="Login Credentials"
            icon="bi-person-lock"
        >
            <div className="form-grid">

                {/* Username */}
                <InputField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={errors.username}
                    placeholder="Example: VTM0001"
                />


                {/* Password */}
                <div className="form-group">

                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Password
                        <span className="required-star">
                            *
                        </span>
                    </label>

                    <div className="password-input-wrapper">

                        <input
                            id="password"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className={`custom-input ${
                                errors.password
                                    ? "input-error"
                                    : ""
                            }`}
                        />

                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() =>
                                setShowPassword(
                                    (prev) => !prev
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            <i
                                className={
                                    showPassword
                                        ? "bi bi-eye-slash"
                                        : "bi bi-eye"
                                }
                            ></i>
                        </button>

                    </div>

                    {errors.password && (
                        <div className="field-error">
                            {errors.password}
                        </div>
                    )}

                </div>

            </div>
        </SectionCard>
    );
}

export default AccountSection;