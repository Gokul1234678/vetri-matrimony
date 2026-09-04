import "../../assets/css/admin/delete-profile-modal.css";

function DeleteProfileModal({
    profile,
    onClose,
    onConfirm,
    deleting,
}) {
    if (!profile) return null;

    return (
        <div className="delete-modal-overlay">

            <div className="delete-profile-modal">

                {/* Close Button */}
                <button
                    type="button"
                    className="delete-modal-close"
                    onClick={onClose}
                    disabled={deleting}
                >
                    <i className="bi bi-x-lg"></i>
                </button>


                {/* Warning Icon */}
                <div className="delete-warning-icon">
                    <i className="bi bi-exclamation-triangle"></i>
                </div>


                <h2>Delete Profile?</h2>


                <p className="delete-description">
                    Are you sure you want to delete this profile?
                </p>


                {/* Profile Info */}
                <div className="delete-profile-info">

                    {profile.profilePhoto && (
                        <img
                            src={profile.profilePhoto}
                            alt={profile.fullName}
                            className="delete-profile-image"
                        />
                    )}

                    <div>

                        <h4>
                            {profile.fullName}
                        </h4>

                        <span>
                            {profile.profileId}
                        </span>

                    </div>

                </div>


                {/* Warning */}
                <div className="delete-danger-warning">

                    <i className="bi bi-exclamation-circle"></i>

                    <div>
                        <strong>Warning</strong>

                        <p>
                            This action cannot be undone.
                            The profile and its linked data
                            will be permanently deleted.
                        </p>
                    </div>

                </div>


                {/* Actions */}
                <div className="delete-modal-actions">

                    <button
                        type="button"
                        className="delete-cancel-btn"
                        onClick={onClose}
                        disabled={deleting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="delete-confirm-btn"
                        onClick={onConfirm}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                ></span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-trash"></i>
                                Delete Profile
                            </>
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteProfileModal;