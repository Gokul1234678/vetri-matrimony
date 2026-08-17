import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function FamilyInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard title="Family Information">
            <div className="form-grid">
                <InputField
                    label="Father's Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    error={errors.fatherName}
                />

                <InputField
                    label="Father's Occupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    error={errors.fatherOccupation}
                />

                <InputField
                    label="Mother's Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    error={errors.motherName}
                />

                <InputField
                    label="Mother's Occupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    error={errors.motherOccupation}
                />

                <InputField
                    label="Brothers"
                    type="number"
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    error={errors.brothers}
                />

                <InputField
                    label="Sisters"
                    type="number"
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    error={errors.sisters}
                />
            </div>
        </SectionCard>
    );
}

export default FamilyInformation;