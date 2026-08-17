import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";
import TextAreaField from "../form/TextAreaField";

function LocationInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard title="Location Information">
            <div className="form-grid">
                <InputField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                   
                    error={errors.country}
                    placeholder="India"
                />

                <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    error={errors.state}
                    placeholder="Tamil Nadu"
                />

                <InputField
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    error={errors.district}
                    placeholder="Thoothukudi"
                />
            </div>

            <TextAreaField
    label="Address"
    name="address"
    value={formData.address}
    onChange={handleChange}
    rows={4}
    required
    error={errors.address}
    placeholder="e.g., No. 123, Anna Nagar West, Chennai, Tamil Nadu - 600040"
/>
        </SectionCard>
    );
}

export default LocationInformation;