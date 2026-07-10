import { Link } from "react-router-dom";

import "../../assets/css/user/UserProfileCard.css";

// Default Image
import defaultProfile from "../../assets/images/default-profile.png";

function UserProfileCard({ profile }) {

    return (

        <div className="user-profile-card">

            {/* Profile Image */}

            <div className="user-profile-image">

                <img

                    src={profile.profilePhoto || defaultProfile}

                    alt={profile.fullName}

                />

            </div>

            {/* Profile Details */}

            <div className="user-profile-body">

                <h4>

                    {profile.fullName}

                </h4>

                <p>

                    {profile.age} Yrs

                    <span>•</span>

                    {profile.district}

                </p>

            </div>

            {/* View Button */}

            <Link

                to={`/profiles/${profile._id}`}

                className="view-profile-btn"

            >

                <i className="bi bi-eye-fill"></i>

                View Profile

            </Link>

        </div>

    );

}

export default UserProfileCard;