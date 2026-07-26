import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/user/UserProfileCard.css";

// Default Image
import defaultProfile from "../../assets/images/default-profile.png";

function UserProfileCard({ profile }) {
const { loadUser } = useAuth();
    return (

        <div className="user-profile-card">

            {/* Profile Image */}

            <div className="user-profile-image">

                <img

                    src={profile?.profilePhoto || defaultProfile}

                    alt={profile?.fullName || "Profile"}

                />

            </div>

            {/* Profile Details */}

            <div className="user-profile-body">

                <h4>

                    {profile?.fullName}

                </h4>

                <p>

                    {profile?.age} Yrs

                    <span> • </span>

                    {profile?.district}

                </p>

            </div>

            {/* View Profile */}

            <Link

                to={`/profiles/${profile?._id}`}
                state={{ from: "/browse-profiles" }}
                className="view-profile-btn"

            >

                <i className="bi bi-eye-fill"></i>

                View Profile

            </Link>

        </div>

    );

}

export default UserProfileCard;