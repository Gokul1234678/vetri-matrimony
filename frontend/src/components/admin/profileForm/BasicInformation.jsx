import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";

function BasicInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard
            number="1"
            title="Basic Information"
            icon="bi-person"
        >
            <div className="form-grid">

                {/* Profile ID */}
                <InputField
                    label="Profile ID"
                    value="Auto Generated"
                    readOnly
                    placeholder="Auto Generated"
                />


                {/* Gender */}
                <SelectField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    error={errors.gender}
                    options={[
                        {
                            value: "Male",
                            label: "Male",
                        },
                        {
                            value: "Female",
                            label: "Female",
                        },
                    ]}
                />


                {/* Full Name */}
                <InputField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    error={errors.fullName}
                    placeholder="Example: Gokul Selvan"
                />


                {/* Date of Birth */}
                <InputField
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    error={errors.dateOfBirth}
                />


                {/* Age */}
                <InputField
                    label="Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    error={errors.age}
                    placeholder="Example: 25"
                    min="18"
                    max="100"
                />


                {/* Mobile Number */}
                <InputField
                    label="Mobile Number"
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    error={errors.mobileNumber}
                    placeholder="Example: 9876543210"
                    maxLength="10"
                    inputMode="numeric"
                />


                {/* WhatsApp Number */}
                <InputField
                    label="WhatsApp Number"
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    error={errors.whatsappNumber}
                    placeholder="Example: 9876543210"
                    maxLength="10"
                    inputMode="numeric"
                />


                {/* Profile Status */}
                <SelectField
                    label="Profile Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    error={errors.status}
                    options={[
                        {
                            value: "active",
                            label: "Active",
                        },
                        {
                            value: "inactive",
                            label: "Inactive",
                        },
                    ]}
                />

            </div>
        </SectionCard>
    );
}

export default BasicInformation;