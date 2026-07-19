import { useNavigate } from "react-router-dom";

import "../../assets/css/user/LockedProfileCard.css";

function LockedProfileCard({

    profile,

    credits,

    onUnlock

}) {

    const navigate = useNavigate();

    // ==========================================
    // Credits
    // ==========================================

    const unlockCost = 1;

    const currentCredits = credits || 0;

    const remainingCredits = Math.max(

        currentCredits - unlockCost,

        0

    );

    const hasEnoughCredits = currentCredits >= unlockCost;

    return (

        <div className="locked-profile-wrapper">

            <div className="locked-profile-card">

                {/* Lock Icon */}

                <div className="lock-icon">

                    <i className="bi bi-lock-fill"></i>

                </div>

                {/* Title */}

                <h2>

                    Profile Locked

                </h2>

                <p className="locked-description">

                    Unlock this profile to view complete profile details.

                </p>

                {/* Benefits */}

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

                            Family Information

                        </li>

                        <li>

                            <i className="bi bi-check-circle-fill"></i>

                            Horoscope

                        </li>

                        <li>

                            <i className="bi bi-check-circle-fill"></i>

                            Partner Expectations

                        </li>

                        <li>

                            <i className="bi bi-check-circle-fill"></i>

                            Contact Details

                        </li>

                    </ul>

                </div>

                {/* Credits */}

                <div className="credits-summary">

                    <div>

                        <span>

                            Current Credits

                        </span>

                        <strong>

                            {currentCredits}

                        </strong>

                    </div>

                    <div>

                        <span>

                            Unlock Cost

                        </span>

                        <strong>

                            {unlockCost} Credit

                        </strong>

                    </div>

                    <div>

                        <span>

                            Remaining After Unlock

                        </span>

                        <strong className="remaining-credit">

                            {remainingCredits}

                        </strong>

                    </div>

                </div>

                {/* Warning */}

                {

                    !hasEnoughCredits && (

                        <div className="credit-warning">

                            <i className="bi bi-exclamation-triangle-fill"></i>

                            <span>

                                You don't have enough credits to unlock this profile.
                                Please contact the matrimony office to add more credits.

                            </span>

                        </div>

                    )

                }

                {/* Buttons */}

                <div className="locked-actions">

                    <button

                        className="cancel-btn"

                        onClick={() => navigate(-1)}

                    >

                        Cancel

                    </button>

                    <button

                        className={`unlock-btn ${!hasEnoughCredits ? "disabled-btn" : ""}`}

                        disabled={!hasEnoughCredits}

                        onClick={onUnlock}

                    >

                        <i className="bi bi-unlock-fill"></i>

                        {

                            hasEnoughCredits

                                ? "Unlock"

                                : "Not Enough Credits"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default LockedProfileCard;