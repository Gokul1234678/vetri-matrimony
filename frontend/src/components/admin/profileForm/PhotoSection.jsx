import SectionCard from "../form/SectionCard";

function PhotoSection({
    formData,
    errors,
    handleImageChange,
    removeImage,
}) {
    return (
        <SectionCard title="Profile Photos">
            <div className="photo-section">

                {/* Main Profile Photo */}
                <div className="main-photo">

                    <label className="photo-label">
                        Profile Photo <span className="required-star">*</span>
                    </label>

                    <label className="upload-card">
                        <input
                            type="file"
                            name="profilePhoto"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />

                        {formData.profilePhoto ? (
                            <img
                                src={URL.createObjectURL(formData.profilePhoto)}
                                alt="Profile"
                            />
                        ) : (
                            <>
                                <i className="bi bi-cloud-arrow-up-fill"></i>

                                <h5>Click to Upload</h5>

                                <p>JPG, PNG (Max 2MB)</p>
                            </>
                        )}
                    </label>

                    {errors.profilePhoto && (
                        <small className="text-danger">
                            {errors.profilePhoto}
                        </small>
                    )}

                    {formData.profilePhoto && (
                        <button
                            type="button"
                            className="remove-photo-btn"
                            onClick={() => removeImage("profilePhoto")}
                        >
                            Remove
                        </button>
                    )}
                </div>

                {/* Additional Photos */}

                <div className="additional-photo-section">

                    <div className="photo-header">
                        <label>Additional Photos</label>

                        <span>
                            {formData.additionalPhotos.length}/5
                        </span>
                    </div>

                    <div className="additional-grid">

                        {Array.from({ length: 5 }).map((_, index) => {

                            const image =
                                formData.additionalPhotos[index];

                            return (
                                <div
                                    className="photo-slot"
                                    key={index}
                                >
                                    {image ? (
                                        <>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt=""
                                            />

                                            <button
                                                type="button"
                                                className="remove-slot-btn"
                                                onClick={() =>
                                                    removeImage(
                                                        "additionalPhotos",
                                                        index
                                                    )
                                                }
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <label className="slot-upload">

                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                name="additionalPhotos"
                                                onChange={handleImageChange}
                                            />

                                            <i className="bi bi-plus-lg"></i>

                                            <span>Add</span>

                                        </label>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {errors.additionalPhotos && (
                        <small className="text-danger">
                            {errors.additionalPhotos}
                        </small>
                    )}
                </div>

            </div>
        </SectionCard>
    );
}

export default PhotoSection;