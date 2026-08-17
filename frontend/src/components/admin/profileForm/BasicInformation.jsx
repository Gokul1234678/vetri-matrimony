import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";

function BasicInformation({

    formData,

    errors,

    handleChange

}) {

    return (

        <SectionCard title="Basic Information">

            <div className="form-grid">

                <InputField

                    label="Profile ID"

                    value="Auto Generated"

                    readOnly

                />

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

                            label: "Male"

                        },

                        {

                            value: "Female",

                            label: "Female"

                        }

                    ]}

                />

                

                <InputField

                    label="Full Name"

                    name="fullName"

                    value={formData.fullName}

                    onChange={handleChange}

                    required

                    error={errors.fullName}

                />

                <InputField

                    label="Date of Birth"

                    type="date"

                    name="dateOfBirth"

                    value={formData.dateOfBirth}

                    onChange={handleChange}

                    required

                    error={errors.dateOfBirth}

                />

                <InputField

                    label="Age"

                    type="number"

                    name="age"

                    value={formData.age}

                    onChange={handleChange}

                    required

                    error={errors.age}

                />

                <InputField

                    label="Mobile Number"

                    name="mobileNumber"

                    value={formData.mobileNumber}

                    onChange={handleChange}

                    required

                    error={errors.mobileNumber}

                />

                <InputField

                    label="WhatsApp Number"

                    name="whatsappNumber"

                    value={formData.whatsappNumber}

                    onChange={handleChange}

                    error={errors.whatsappNumber}

                />

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