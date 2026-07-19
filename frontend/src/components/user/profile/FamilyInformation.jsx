import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function FamilyInformation({ profile }) {

    return (

        <ProfileSection
            title="Family Information"
            icon="bi bi-people-fill"
        >

            <ProfileField
                label="Father Name"
                value={profile.fatherName}
            />

            <ProfileField
                label="Father Occupation"
                value={profile.fatherOccupation}
            />

            <ProfileField
                label="Mother Name"
                value={profile.motherName}
            />

            <ProfileField
                label="Mother Occupation"
                value={profile.motherOccupation}
            />

            <ProfileField
                label="Brothers"
                value={profile.brothers}
            />

           

            <ProfileField
                label="Sisters"
                value={profile.sisters}
            />

            

            

        </ProfileSection>

    );

}

export default FamilyInformation;