import SectionCard from "../form/SectionCard";
import TextAreaField from "../form/TextAreaField";

function AboutMeSection({
    formData,
    errors,
    handleChange,
}) {
    return (
        <SectionCard title="About Me">
            <TextAreaField
                label="About Me"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                rows={6}               
                error={errors.aboutMe}
                placeholder="Write a short description about the profile..."
            />
        </SectionCard>
    );
}

export default AboutMeSection;