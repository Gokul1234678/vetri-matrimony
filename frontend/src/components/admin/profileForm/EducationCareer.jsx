import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function EducationCareer({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard
    number="4"
    title="Education & Career"
    icon="bi-mortarboard"
>
            <div className="form-grid">
                <InputField
                    label="Highest Education"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    error={errors.qualification}
                    placeholder="B.Sc Computer Science"
                />

                <InputField
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    error={errors.occupation}
                    placeholder="Software Engineer"
                />

                <InputField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={errors.companyName}
                    placeholder="ABC Technologies"
                />

                <InputField
                    label="Annual Income"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    error={errors.annualIncome}
                    placeholder="₹5,00,000"
                />
            </div>
        </SectionCard>
    );
}

export default EducationCareer;