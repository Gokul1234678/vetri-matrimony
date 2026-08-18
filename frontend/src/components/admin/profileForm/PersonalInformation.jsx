import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";

function PersonalInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard
            number="2"
            title="Personal Information"
            icon="bi-person"
        >
            <div className="form-grid">

                {/* Height */}
                <InputField
                    label="Height (ft/in)"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    error={errors.height}
                    placeholder={`Example: 5'8"`}
                    list="heightSuggestions"
                />

                <datalist id="heightSuggestions">
                    <option value={`4'10"`} />
                    <option value={`5'0"`} />
                    <option value={`5'2"`} />
                    <option value={`5'4"`} />
                    <option value={`5'6"`} />
                    <option value={`5'8"`} />
                    <option value={`5'10"`} />
                    <option value={`6'0"`} />
                    <option value={`6'2"`} />
                </datalist>


                {/* Weight */}
                <InputField
                    label="Weight (kg)"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    error={errors.weight}
                    placeholder="Example: 70"
                />


                {/* Marital Status */}
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


                {/* Religion */}
                <InputField
                    label="Religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    error={errors.religion}
                    placeholder="Example: Hindu"
                    list="religionSuggestions"
                />

                <datalist id="religionSuggestions">
                    <option value="Hindu" />
                    <option value="Christian" />
                    <option value="Muslim" />
                    <option value="Sikh" />
                    <option value="Buddhist" />
                    <option value="Jain" />
                    <option value="Other" />
                </datalist>


                {/* Caste */}
                <InputField
                    label="Caste"
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    required
                    error={errors.caste}
                    placeholder="Example: Nadar"
                    list="casteSuggestions"
                />

                <datalist id="casteSuggestions">
                    <option value="Nadar" />
                    <option value="Vellalar" />
                    <option value="Thevar" />
                    <option value="Naidu" />
                    <option value="Pillai" />
                    <option value="Chettiar" />
                    <option value="Brahmin" />
                    <option value="Other" />
                </datalist>


                {/* Sub Caste */}
                <InputField
                    label="Sub Caste"
                    name="subCaste"
                    value={formData.subCaste}
                    onChange={handleChange}
                    error={errors.subCaste}
                    placeholder="Example: Nadar"
                    list="subCasteSuggestions"
                />

                <datalist id="subCasteSuggestions">
                    <option value="Nadar" />
                    <option value="Shanar" />
                    <option value="Other" />
                </datalist>


                {/* Mother Tongue */}
                <InputField
                    label="Mother Tongue"
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleChange}
                    required
                    error={errors.motherTongue}
                    placeholder="Example: Tamil"
                    list="motherTongueSuggestions"
                />

                <datalist id="motherTongueSuggestions">
                    <option value="Tamil" />
                    <option value="English" />
                    <option value="Malayalam" />
                    <option value="Telugu" />
                    <option value="Kannada" />
                    <option value="Hindi" />
                    <option value="Other" />
                </datalist>

            </div>
        </SectionCard>
    );
}

export default PersonalInformation;