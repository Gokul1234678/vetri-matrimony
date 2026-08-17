import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";

function PersonalInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard title="Personal Information">
            <div className="form-grid">
                <InputField
                    label="Height (ft/in)"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    // required
                    error={errors.height}
                    placeholder="5'8&quot;"
                />

                <InputField
                    label="Weight (kg)"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    // required
                    error={errors.weight}
                    placeholder="70"
                />

                <SelectField
                    label="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                    error={errors.maritalStatus}
                    options={[
                        {
                            value: "Never Married",
                            label: "Never Married",
                        },
                        {
                            value: "Divorced",
                            label: "Divorced",
                        },
                        {
                            value: "Widowed",
                            label: "Widowed",
                        },
                    ]}
                />

                <InputField
                    label="Religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    error={errors.religion}
                />

                <InputField
                    label="Caste"
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    required
                    error={errors.caste}
                />

                <InputField
                    label="Sub Caste"
                    name="subCaste"
                    value={formData.subCaste}
                    onChange={handleChange}
                    error={errors.subCaste}
                />

                <InputField
                    label="Mother Tongue"
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleChange}
                    required
                    error={errors.motherTongue}
                />

                
            </div>
        </SectionCard>
    );
}

export default PersonalInformation;