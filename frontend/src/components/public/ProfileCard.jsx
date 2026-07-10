import "../../assets/css/public/ProfileCard.css";

// const DEFAULT_IMAGE =
//     "https://placehold.co/400x500/e9ecef/6c757d?text=Profile+Photo";
const DEFAULT_IMAGE =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy8fSabmG_TcZLtTTiedr81bYgG0DdIkT2lpRKLgl5Q&s=10";

function ProfileCard({ profile }) {

    return (

        <div className="profile-card">

            {/* Profile Image */}

            <div className="profile-image-container">

                <img

                    src={profile?.profilePhoto || DEFAULT_IMAGE}

                    alt={profile?.fullName || "Profile"}

                    // Handle image load errors
                    onError={(e) => {

                        e.target.src = DEFAULT_IMAGE;

                    }}
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