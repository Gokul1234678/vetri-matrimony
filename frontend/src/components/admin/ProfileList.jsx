import "../../assets/css/admin/profile-list.css";

function ProfileList({
    profiles,
    pagination,
    onAddCredit,
    onDelete,
}) {
    return (
        <section className="profiles-section-admin">

            {/* ============================
                Section Header
            ============================ */}

            <div className="profiles-section-header">

                <div>
                    <h2>Profile List</h2>

                    <p>
                        Manage all matrimonial profiles.
                    </p>
                </div>

                <div className="profiles-header-right">

                    <span className="total-profiles">
                        Total Profiles:{" "}
                        <strong>
                            {pagination?.totalProfiles ?? 0}
                        </strong>
                    </span>

                    <button
                        type="button"
                        className="create-profile-btn"
                        onClick={() => {
                            window.location.href =
                                "/admin/profiles/create";
                        }}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Create New Profile
                    </button>

                </div>

            </div>

            {/* ============================
                Profiles Table
            ============================ */}

            <div className="profiles-table-wrapper">

                <table className="profiles-table">

                    <thead>

                        <tr>
                            <th>Profile ID</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Credits</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {profiles.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="no-profiles"
                                >
                                    <i className="bi bi-person-x"></i>

                                    <p>
                                        No profiles found.
                                    </p>
                                </td>

                            </tr>

                        ) : (

                            profiles.map((profile) => (

                                <tr key={profile._id}>

                                    {/* Profile ID */}

                                    <td>

                                        <span className="profile-id-admin">
                                            {profile.profileId}
                                        </span>

                                    </td>

                                    {/* Profile Image */}

                                    <td>

                                        <img
                                            src={profile.profilePhoto}
                                            alt={profile.fullName}
                                            className="profile-image-admin"
                                        />

                                    </td>

                                    {/* Name */}

                                    <td>

                                        <span className="profile-name">
                                            {profile.fullName}
                                        </span>

                                    </td>

                                    {/* Gender */}

                                    <td>

                                        <span className="profile-gender">
                                            {profile.gender}
                                        </span>

                                    </td>

                                    {/* Credits */}

                                    <td>

                                        <button
                                            type="button"
                                            className="credits-btn"
                                            onClick={() =>
                                                onAddCredit(profile)
                                            }
                                        >
                                            <i className="bi bi-coin"></i>

                                            {profile.credits}

                                        </button>

                                    </td>

                                    {/* Status */}

                                    <td>

                                        <span
                                            className={`status-badge ${profile.status === "active"
                                                ? "active"
                                                : "inactive"
                                                }`}
                                        >

                                            <span className="status-dot"></span>

                                            {profile.status === "active"
                                                ? "Active"
                                                : "Inactive"}

                                        </span>

                                    </td>

                                    {/* Actions */}

                                    <td>

                                        <div className="profile-actions">

                                            {/* View */}

                                            <button
                                                type="button"
                                                className="view-btn-admin"
                                                onClick={() => {
                                                    window.location.href =
                                                        `/admin/profiles/view/${profile._id}`;
                                                }}
                                            >
                                                <i className="bi bi-eye"></i>
                                                View
                                            </button>

                                            {/* Edit */}

                                            <button
                                                type="button"
                                                className="edit-btn"
                                                onClick={() =>
                                                    window.location.href =
                                                    `/admin/profiles/edit/${profile._id}`
                                                }
                                            >
                                                <i className="bi bi-pencil"></i>
                                                Edit
                                            </button>

                                            {/* Delete */}

                                            <button
                                                type="button"
                                                className="delete-btn"
                                               onClick={() => onDelete(profile)}
                                            >
                                                <i className="bi bi-trash"></i>
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}

export default ProfileList;