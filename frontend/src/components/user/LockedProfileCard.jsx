import { useNavigate } from "react-router-dom";

import "../../assets/css/user/LockedProfileCard.css";

function LockedProfileCard({
    profile,
    credits,
    onUnlock
}) {
    const navigate = useNavigate();

    const unlockCost = 1;
    const currentCredits = credits || 0;
    const remainingCredits = Math.max(
        currentCredits - unlockCost,
        0
    );
    const hasEnoughCredits = currentCredits >= unlockCost;

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

    return (
        <div className="locked-profile-wrapper">

            <div className="locked-profile-card">

                <div className="locked-left">

                    <div className="lock-icon">
                        <i className="bi bi-lock-fill"></i>
                    </div>

                    <h2>
                        Profile Locked
                    </h2>

                    <p className="locked-description">
                        Unlock this profile to view complete profile details.
                    </p>

                    <div className="locked-basic-profile">

                        <div className="locked-profile-photo">
                            {profile?.profilePhoto ? (
                                <img
                                    src={profile.profilePhoto}
                                    alt={profile.fullName}
                                />
                            ) : (
                                <div className="locked-no-photo">
                                    <i className="bi bi-person-fill"></i>
                                </div>
                            )}
                        </div>

                        <div className="locked-profile-info">

                            <h3>
                                {displayValue(profile?.fullName)}
                            </h3>

                            <div className="locked-info-grid">

                                <div>
                                    <i className="bi bi-calendar3"></i>
                                    <span>
                                        {displayValue(profile?.age)} years
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-person"></i>
                                    <span>
                                        {displayValue(profile?.gender)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-geo-alt"></i>
                                    <span>
                                        {displayValue(profile?.district)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-heart"></i>
                                    <span>
                                        {displayValue(profile?.religion)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-people"></i>
                                    <span>
                                        {displayValue(profile?.caste)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-diagram-3"></i>
                                    <span>
                                        {displayValue(profile?.subCaste)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-mortarboard"></i>
                                    <span>
                                        {displayValue(profile?.qualification)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-briefcase"></i>
                                    <span>
                                        {displayValue(profile?.occupation)}
                                    </span>
                                </div>

                                <div>
                                    <i className="bi bi-heart-fill"></i>
                                    <span>
                                        {displayValue(profile?.maritalStatus)}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="unlock-benefits">

                        <h4>
                            After Unlock You Can View
                        </h4>

                        <ul>

                            <li>
                                <i className="bi bi-check-circle-fill"></i>
                                Personal Information
                            </li>

                            <li>
                                <i className="bi bi-check-circle-fill"></i>
                                Education & Occupation
                            </li>

                            <li>
                                <i className="bi bi-check-circle-fill"></i>
                                Contact Details
                            </li>

                            <li>
                                <i className="bi bi-check-circle-fill"></i>
                                Family Information
                            </li>

                            <li>
                                <i className="bi bi-check-circle-fill"></i>
                                Horoscope
                            </li>

                        </ul>

                    </div>

                </div>

                <div className="locked-right">

                    <div className="credits-summary">

                        <div>
                            <span>Current Credits</span>
                            <strong>{currentCredits}</strong>
                        </div>

                        <div>
                            <span>Unlock Cost</span>
                            <strong>{unlockCost} Credit</strong>
                        </div>

                        <div>
                            <span>Remaining After Unlock</span>
                            <strong className="remaining-credit">
                                {remainingCredits}
                            </strong>
                        </div>

                    </div>

                    {!hasEnoughCredits && (
                        <div className="credit-warning">
                            <i className="bi bi-exclamation-triangle-fill"></i>

                            <span>
                                You don't have enough credits to unlock this profile.
                                Please contact the matrimony office to add more credits.
                            </span>
                        </div>
                    )}

                    <div className="locked-actions">

                        <button
                            className="cancel-btn"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>

                        <button
                            className={`unlock-btn ${
                                !hasEnoughCredits ? "disabled-btn" : ""
                            }`}
                            disabled={!hasEnoughCredits}
                            onClick={onUnlock}
                        >
                            <i className="bi bi-unlock-fill"></i>

                            {hasEnoughCredits
                                ? "Unlock"
                                : "Not Enough Credits"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LockedProfileCard;