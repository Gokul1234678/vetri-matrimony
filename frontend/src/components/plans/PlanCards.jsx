import { Link } from "react-router-dom";
import { PLANS } from "../../config/plansConfig";
import "../../assets/css/public/plans.css";

function PlanCards({ contactPath }) {
    return (
        <div className="plans-page">
            <div className="plans-container">
                <div className="plans-header">
                    <span className="plans-eyebrow">
                        Choose Your Plan
                    </span>

                    <h1>Find the Right Plan for You</h1>

                    <p>
                        Choose a credit plan that suits your profile search
                        needs and unlock contact details of suitable matches.
                    </p>
                </div>

                <div className="plans-grid">
                    {PLANS.map((plan) => (
                        <div
                            className={`plan-card ${
                                plan.popular ? "popular-plan" : ""
                            }`}
                            key={plan.id}
                        >
                            {plan.badge && (
                                <div className="plan-badge">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="plan-card-header">
                                <h2>{plan.name}</h2>
                                <p>{plan.description}</p>
                            </div>

                            <div className="plan-price">
                                <span className="plan-currency">₹</span>

                                <span className="plan-price-value">
                                    {plan.price.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="plan-credit-box">
                                <i className="bi bi-coin"></i>
                                <strong>{plan.credits} Credits</strong>
                            </div>

                            <ul className="plan-features">
                                <li>
                                    <i className="bi bi-check-circle-fill"></i>
                                    Unlock contact details
                                </li>

                                <li>
                                    <i className="bi bi-check-circle-fill"></i>
                                    Use credits for suitable profiles
                                </li>

                                <li>
                                    <i className="bi bi-check-circle-fill"></i>
                                    Credits do not expire
                                </li>
                            </ul>

                            <Link
                                to={contactPath}
                                className="plan-contact-btn"
                            >
                                Contact Admin to Purchase
                                <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="plans-note">
                    <i className="bi bi-info-circle"></i>

                    <p>
                        Payment is currently handled directly through the
                        Anbinai Matrimony admin. After payment confirmation,
                        the selected credits will be added to your account.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlanCards;