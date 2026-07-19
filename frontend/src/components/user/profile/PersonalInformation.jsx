import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function PersonalInformation({ profile }) {

    return (

        <ProfileSection

            title="Personal Information"

            icon="bi bi-person-fill"

            color="pink"

        >

            <ProfileField

                label="Name"

                value={profile.fullName}

            />

            <ProfileField
                label="Date of Birth"
                value={
                    profile.dateOfBirth
                        ? new Date(profile.dateOfBirth).toLocaleDateString("en-GB")
                        : "-"
                }
            />

            <ProfileField

                label="Age"

                value={`${profile.age} Years`}

            />

            <ProfileField

                label="Height"

                value={profile.height}

            />

            <ProfileField

                label="Weight"

                value={profile.weight}

            />

            <ProfileField

                label="Marital Status"

                value={profile.maritalStatus}

            />

            <ProfileField

                label="Religion"

                value={profile.religion}

            />

            <ProfileField

                label="Caste"

                value={profile.caste}

            />

            <ProfileField

                label="Sub Caste"

                value={profile.subCaste}

            />

            <ProfileField

                label="Mother Tongue"

                value={profile.motherTongue}

            />

            <ProfileField

                label="Eating Habit"

                value={profile.eatingHabit}

            />

        </ProfileSection>

    );

}

export default PersonalInformation;