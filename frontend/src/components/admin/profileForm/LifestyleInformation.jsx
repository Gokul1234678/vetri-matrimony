import SectionCard from "../form/SectionCard";
import SelectField from "../form/SelectField";

function LifestyleInformation({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard title="Lifestyle Information">
            <div className="form-grid">
                <SelectField
                    label="Eating Habit"
                    name="eatingHabit"
                    value={formData.eatingHabit}
                    onChange={handleChange}
                    error={errors.eatingHabit}
                    options={[
                        {
                            value: "Vegetarian",
                            label: "Vegetarian",
                        },
                        {
                            value: "Non-Vegetarian",
                            label: "Non-Vegetarian",
                        },
                        {
                            value: "Eggetarian",
                            label: "Eggetarian",
                        },
                    ]}
                />

                <SelectField
                    label="Smoking Habit"
                    name="smokingHabit"
                    value={formData.smokingHabit}
                    onChange={handleChange}
                    error={errors.smokingHabit}
                    options={[
                        {
                            value: "No",
                            label: "No",
                        },
                        {
                            value: "Occasionally",
                            label: "Occasionally",
                        },
                        {
                            value: "Regularly",
                            label: "Regularly",
                        },
                    ]}
                />

                <SelectField
                    label="Drinking Habit"
                    name="drinkingHabit"
                    value={formData.drinkingHabit}
                    onChange={handleChange}
                    error={errors.drinkingHabit}
                    options={[
                        {
                            value: "No",
                            label: "No",
                        },
                        {
                            value: "Occasionally",
                            label: "Occasionally",
                        },
                        {
                            value: "Regularly",
                            label: "Regularly",
                        },
                    ]}
                />
            </div>
        </SectionCard>
    );
}

export default LifestyleInformation;