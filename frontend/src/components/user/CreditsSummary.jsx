import ProfileSection from "./profile/ProfileSection";

import "../../assets/css/user/creditsSummary.css";

function CreditsSummary({ profile }) {
    const purchased = profile.totalCredits || 0;
    const remaining = profile.credits || 0;
    const used = purchased - remaining;

    return (
        <ProfileSection
            title="Credits Summary"
            icon="bi bi-coin"
            color="gold"
            subtitle="Your current credit usage"
        >
            <div className="credit-summary">
                <div className="credit-row">
                    <span>Credits Purchased</span>
                    <span>{purchased}</span>
                </div>

                <div className="credit-row">
                    <span>Credits Used</span>
                    <span>{used}</span>
                </div>

                <div className="credit-row credit-remaining">
                    <span>Credits Remaining</span>
                    <span>{remaining}</span>
                </div>
            </div>
        </ProfileSection>
    );
}

export default CreditsSummary;