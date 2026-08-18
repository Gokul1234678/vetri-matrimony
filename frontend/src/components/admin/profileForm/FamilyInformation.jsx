import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function FamilyInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard
            number="5"
            title="Family Information"
            icon="bi-people"
        >
            <div className="form-grid">

                {/* Father's Name */}
                <InputField
                    label="Father's Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    error={errors.fatherName}
                    placeholder="Example: Selvan"
                />


                {/* Father's Occupation */}
                <InputField
                    label="Father's Occupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    error={errors.fatherOccupation}
                    placeholder="Example: Business"
                    list="fatherOccupationSuggestions"
                />

                <datalist id="fatherOccupationSuggestions">
                    <option value="Business" />
                    <option value="Farmer" />
                    <option value="Government Employee" />
                    <option value="Private Employee" />
                    <option value="Teacher" />
                    <option value="Driver" />
                    <option value="Retired" />
                    <option value="Self Employed" />
                    <option value="Not Working" />
                </datalist>


                {/* Mother's Name */}
                <InputField
                    label="Mother's Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    error={errors.motherName}
                    placeholder="Example: Lakshmi"
                />


                {/* Mother's Occupation */}
                <InputField
                    label="Mother's Occupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    error={errors.motherOccupation}
                    placeholder="Example: Homemaker"
                    list="motherOccupationSuggestions"
                />

                <datalist id="motherOccupationSuggestions">
                    <option value="Homemaker" />
                    <option value="Teacher" />
                    <option value="Government Employee" />
                    <option value="Private Employee" />
                    <option value="Business" />
                    <option value="Farmer" />
                    <option value="Self Employed" />
                    <option value="Retired" />
                    <option value="Not Working" />
                </datalist>


                {/* Brothers */}
                <InputField
                    label="Brothers"
                    type="number"
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    error={errors.brothers}
                    placeholder="Example: 1"
                    min="0"
                />


                {/* Sisters */}
                <InputField
                    label="Sisters"
                    type="number"
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    error={errors.sisters}
                    placeholder="Example: 2"
                    min="0"
                />

            </div>
        </SectionCard>
    );
}

export default FamilyInformation;