import SectionCard from "../form/SectionCard";

function HoroscopeSection({
    formData,
    errors,
    handleImageChange,
    removeImage,
}) {
    return (
        <SectionCard title="Horoscope">
            <div className="horoscope-section">
                <label className="photo-label">
                    Horoscope Image
                </label>

                <label className="upload-card">
                    <input
                        type="file"
                        name="horoscopeImage"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />

                    {formData.horoscopeImage ? (
                        <img
                            src={URL.createObjectURL(formData.horoscopeImage)}
                            alt="Horoscope"
                        />
                    ) : (
                        <>
                            <i className="bi bi-cloud-arrow-up-fill"></i>

                            <h5>Click to Upload</h5>

                            <p>JPG, PNG (Max 2MB)</p>
                        </>
                    )}
                </label>

                {errors.horoscopeImage && (
                    <small className="text-danger">
                        {errors.horoscopeImage}
                    </small>
                )}

                {formData.horoscopeImage && (
                    <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => removeImage("horoscopeImage")}
                    >
                        Remove Image
                    </button>
                )}
            </div>
        </SectionCard>
    );
}

export default HoroscopeSection;