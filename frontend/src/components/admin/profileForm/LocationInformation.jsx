import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";
import TextAreaField from "../form/TextAreaField";

function LocationInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard
            number="3"
            title="Location Information"
            icon="bi-geo-alt"
        >
            <div className="form-grid">

                {/* Country */}
                <InputField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    error={errors.country}
                    placeholder="Example: India"
                    list="countrySuggestions"
                />

                <datalist id="countrySuggestions">
                    <option value="India" />
                    <option value="United Arab Emirates" />
                    <option value="United States" />
                    <option value="United Kingdom" />
                    <option value="Canada" />
                    <option value="Australia" />
                    <option value="Singapore" />
                    <option value="Malaysia" />
                </datalist>


                {/* State */}
                <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    error={errors.state}
                    placeholder="Example: Tamil Nadu"
                    list="stateSuggestions"
                />

                <datalist id="stateSuggestions">
                    <option value="Tamil Nadu" />
                    <option value="Kerala" />
                    <option value="Karnataka" />
                    <option value="Andhra Pradesh" />
                    <option value="Telangana" />
                    <option value="Maharashtra" />
                    <option value="Karnataka" />
                    <option value="Delhi" />
                    <option value="Gujarat" />
                    <option value="Rajasthan" />
                    <option value="West Bengal" />
                </datalist>


                {/* District */}
                <InputField
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    error={errors.district}
                    placeholder="Example: Thoothukudi"
                    list="districtSuggestions"
                />

                <datalist id="districtSuggestions">
                    <option value="Thoothukudi" />
                    <option value="Tirunelveli" />
                    <option value="Kanyakumari" />
                    <option value="Madurai" />
                    <option value="Chennai" />
                    <option value="Coimbatore" />
                    <option value="Tenkasi" />
                    <option value="Virudhunagar" />
                    <option value="Ramanathapuram" />
                    <option value="Thanjavur" />
                    <option value="Trichy" />
                    <option value="Salem" />
                </datalist>

            </div>


            {/* Address */}
            <TextAreaField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                required
                error={errors.address}
                placeholder="Example: No. 123, Anna Nagar West, Chennai, Tamil Nadu - 600040"
            />

        </SectionCard>
    );
}

export default LocationInformation;