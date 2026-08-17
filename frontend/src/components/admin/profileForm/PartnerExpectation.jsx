import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function PartnerExpectation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard title="Partner Expectations">
            <div className="form-grid">
                <InputField
                    label="Preferred Age"
                    name="preferredAge"
                    value={formData.partnerExpectations.preferredAge}
                    onChange={handleChange}
                    error={errors.preferredAge}
                    placeholder="21 - 28"
                />

                <InputField
                    label="Preferred Education"
                    name="preferredEducation"
                    value={formData.partnerExpectations.preferredEducation}
                    onChange={handleChange}
                    error={errors.preferredEducation}
                    placeholder="B.E, B.Sc, M.Tech..."
                />

                <InputField
                    label="Preferred Location"
                    name="preferredLocation"
                    value={formData.partnerExpectations.preferredLocation}
                    onChange={handleChange}
                    error={errors.preferredLocation}
                    placeholder="Chennai"
                />

                <InputField
                    label="Preferred Religion"
                    name="preferredReligion"
                    value={formData.partnerExpectations.preferredReligion}
                    onChange={handleChange}
                    error={errors.preferredReligion}
                />

                <InputField
                    label="Preferred Caste"
                    name="preferredCaste"
                    value={formData.partnerExpectations.preferredCaste}
                    onChange={handleChange}
                    error={errors.preferredCaste}
                />
            </div>
        </SectionCard>
    );
}

export default PartnerExpectation;