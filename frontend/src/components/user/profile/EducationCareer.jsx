import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function EducationCareer({ profile }) {

    return (
        <ProfileSection
            title="Education & Career"
            icon="bi bi-mortarboard-fill"
        >
            <ProfileField
                label="Education"
                value={profile.qualification}
            />

            <ProfileField
                label="Occupation"
                value={profile.occupation}
            />

            <ProfileField
                label="Company"
                value={profile.companyName}
            />

           
            <ProfileField
                label="Annual Income"
                value={profile.annualIncome}
            />

            
        </ProfileSection>
    );

}

export default EducationCareer;