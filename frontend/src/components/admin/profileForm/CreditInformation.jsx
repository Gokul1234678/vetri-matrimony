import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function CreditInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard
    number="12"
    title="Credits"
    icon="bi-credit-card"
>
            <div className="form-grid">
                <InputField
                    label="Initial Credits"
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleChange}
                    required
                    error={errors.credits}
                    placeholder="0"  min="0"
                />
            </div>
        </SectionCard>
    );
}

export default CreditInformation;