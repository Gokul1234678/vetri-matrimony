import "../../assets/css/public/ProfileCard.css";

const DEFAULT_IMAGE =
    "https://placehold.co/400x500/e9ecef/6c757d?text=Profile+Photo";

function ProfileCard({ profile }) {

    return (

        <div className="profile-card">

            {/* Profile Image */}

            <div className="profile-image-container">

                <img

                    src={profile?.profilePhoto || DEFAULT_IMAGE}

                    alt={profile?.fullName || "Profile"}

                    className="profile-image"

                />

            </div>

            {/* Profile Name */}

            <div className="profile-content">

                <h5>

                    {profile?.fullName || "Unknown"}

                </h5>

            </div>

            {/* Login Message */}

            <div className="profile-footer">

                🔒 Login to view details

            </div>

        </div>

    );

}

export default ProfileCard;