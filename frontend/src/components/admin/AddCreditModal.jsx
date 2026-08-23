function AddCreditModal({
    profile,
    credits,
    setCredits,
    onClose,
    onSubmit,
    loading,
}) {
    if (!profile) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="credit-modal-overlay" onClick={onClose}>

            <div
                className="credit-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="credit-modal-header">

                    <div>
                        <h2>
                            <i className="bi bi-coin"></i>
                            Add Credits
                        </h2>

                        <p>
                            Add credits to this profile
                        </p>
                    </div>

                    <button
                        type="button"
                        className="credit-modal-close"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                {/* Profile Information */}
                <div className="credit-profile-info">

                    <div className="credit-profile-image-wrapper">

                        <img
                            src={profile.profilePhoto}
                            alt={profile.fullName}
                            className="credit-profile-image"
                        />

                    </div>

                    <div className="credit-profile-details">

                        <span className="credit-profile-id">
                            {profile.profileId}
                        </span>

                        <h3>
                            {profile.fullName}
                        </h3>

                        <p>
                            Current Credits:
                            <strong>
                                {profile.credits}
                            </strong>
                        </p>

                    </div>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="credit-form-group">

                        <label htmlFor="credits">
                            Credits to Add
                        </label>

                        <input
                            id="credits"
                            type="number"
                            min="1"
                            step="1"
                            value={credits}
                            onChange={(e) =>
                                setCredits(e.target.value)
                            }
                            placeholder="Enter credits"
                            disabled={loading}
                            autoFocus
                            required
                        />

                    </div>

                    {/* Buttons */}
                    <div className="credit-modal-actions">

                        <button
                            type="button"
                            className="credit-cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="credit-submit-btn"
                            disabled={
                                loading ||
                                !credits ||
                                Number(credits) <= 0
                            }
                        >

                            {loading ? (
                                <>
                                    <span className="credit-spinner"></span>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-plus-lg"></i>
                                    Add Credits
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCreditModal;