import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function FamilyInformation({
    formData,
    errors,
    handleChange,
}) {
    const getUnmarried = (type) => {
        const total = Number(formData.siblings?.[type]?.total || 0);
        const married = Number(formData.siblings?.[type]?.married || 0);
        return Math.max(0, total - married);
    };

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

                {/* Elder Brothers */}
                <InputField
                    label="Elder Brothers - Total"
                    type="number"
                    name="siblings.eb.total"
                    value={formData.siblings?.eb?.total || ""}
                    onChange={handleChange}
                    error={errors.siblings?.eb?.total}
                    placeholder="Example: 2"
                    min="0"
                />

                <InputField
                    label="Elder Brothers - Married"
                    type="number"
                    name="siblings.eb.married"
                    value={formData.siblings?.eb?.married || ""}
                    onChange={handleChange}
                    error={errors.siblings?.eb?.married}
                    placeholder="Example: 1"
                    min="0"
                />

                <InputField
                    label="Elder Brothers - Unmarried"
                    type="number"
                    value={getUnmarried("eb")}
                    readOnly
                />

                {/* Younger Brothers */}
                <InputField
                    label="Younger Brothers - Total"
                    type="number"
                    name="siblings.yb.total"
                    value={formData.siblings?.yb?.total || ""}
                    onChange={handleChange}
                    error={errors.siblings?.yb?.total}
                    placeholder="Example: 1"
                    min="0"
                />

                <InputField
                    label="Younger Brothers - Married"
                    type="number"
                    name="siblings.yb.married"
                    value={formData.siblings?.yb?.married || ""}
                    onChange={handleChange}
                    error={errors.siblings?.yb?.married}
                    placeholder="Example: 0"
                    min="0"
                />

                <InputField
                    label="Younger Brothers - Unmarried"
                    type="number"
                    value={getUnmarried("yb")}
                    readOnly
                />

                {/* Elder Sisters */}
                <InputField
                    label="Elder Sisters - Total"
                    type="number"
                    name="siblings.es.total"
                    value={formData.siblings?.es?.total || ""}
                    onChange={handleChange}
                    error={errors.siblings?.es?.total}
                    placeholder="Example: 1"
                    min="0"
                />

                <InputField
                    label="Elder Sisters - Married"
                    type="number"
                    name="siblings.es.married"
                    value={formData.siblings?.es?.married || ""}
                    onChange={handleChange}
                    error={errors.siblings?.es?.married}
                    placeholder="Example: 1"
                    min="0"
                />

                <InputField
                    label="Elder Sisters - Unmarried"
                    type="number"
                    value={getUnmarried("es")}
                    readOnly
                />

                {/* Younger Sisters */}
                <InputField
                    label="Younger Sisters - Total"
                    type="number"
                    name="siblings.ys.total"
                    value={formData.siblings?.ys?.total || ""}
                    onChange={handleChange}
                    error={errors.siblings?.ys?.total}
                    placeholder="Example: 2"
                    min="0"
                />

                <InputField
                    label="Younger Sisters - Married"
                    type="number"
                    name="siblings.ys.married"
                    value={formData.siblings?.ys?.married || ""}
                    onChange={handleChange}
                    error={errors.siblings?.ys?.married}
                    placeholder="Example: 1"
                    min="0"
                />

                <InputField
                    label="Younger Sisters - Unmarried"
                    type="number"
                    value={getUnmarried("ys")}
                    readOnly
                />
            </div>
        </SectionCard>
    );
}

export default FamilyInformation;