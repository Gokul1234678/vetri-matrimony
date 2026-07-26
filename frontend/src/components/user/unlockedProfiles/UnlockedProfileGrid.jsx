import { Link } from "react-router-dom";

import "../../../assets/css/user/unlockedProfiles/grid.css";

import Pagination from "../../common/Pagination";

import defaultProfile from "../../../assets/images/default-profile.png";

// ==========================================
// Format ISO date -> "19 Jul 2026"
// ==========================================
const formatDate = (isoDate) => {
    if (!isoDate) return "-";

    return new Date(isoDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
};

function UnlockedProfileGrid({

    loading,

    profiles,

    currentPage,

    totalPages,

    onPageChange

}) {

    if (loading) {

        return (

            <div className="text-center py-5">

                Loading unlocked profiles...

            </div>

        );

    }

    return (

        <section className="unlocked-profile-grid">

            {/* Header */}

            <div className="grid-header">

                <h3>

                    Showing

                    <span>

                        {profiles.length}

                    </span>

                    unlocked profile{profiles.length !== 1 && "s"}

                </h3>

            </div>

            {

                profiles.length === 0 ? (

                    <div className="empty-state">

                        <i className="bi bi-unlock"></i>

                        <h3>

                            No unlocked profiles yet

                        </h3>

                        <p>

                            Browse profiles and unlock the profiles
                            you're interested in.

                        </p>

                        <Link
                            to="/browse-profiles"
                            className="browse-btn"
                        >

                            Browse Profiles

                        </Link>

                    </div>

                ) : (

                    <>

                        <div className="profiles-grid">

                            {

                                profiles.map((profile) => (

                                    <div
                                        className="unlocked-card"
                                        key={profile._id}
                                    >

                                        <div className="unlocked-card-image">

                                            <img
                                                src={
                                                    profile.profilePhoto ||
                                                    defaultProfile
                                                }
                                                alt={profile.fullName}
                                            />

                                            <span className="unlocked-profile-id">
                                                {profile.profileId}
                                            </span>

                                        </div>

                                        <div className="card-body">

                                            <h4>

                                                {profile.fullName}

                                            </h4>

                                            <p>

                                                {profile.age} Years •{" "}

                                                {profile.district}

                                            </p>

                                            <div className="unlock-date">

                                                <i className="bi bi-calendar-check"></i>

                                                <span>

                                                    Unlocked on{" "}

                                                    {formatDate(profile.unlockedAt)}

                                                </span>

                                            </div>

                                            <Link
                                                to={`/profiles/${profile._id}`}
                                                state={{ from: "/unlocked-profiles" }}
                                                className="view-btn"
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                                View Profile
                                            </Link>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />

                    </>

                )

            }

        </section>

    );

}

export default UnlockedProfileGrid;