import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function LifestyleInformation({ profile }) {

    return (

        <ProfileSection
            title="Lifestyle Information"
            icon="bi bi-heart-pulse-fill"
        >

           

            <ProfileField
                label="Eating Habit"
                value={profile.eatingHabit}
            />

            <ProfileField
                label="Smoking Habit"
                value={profile.smokingHabit}
            />

            <ProfileField
                label="Drinking Habit"
                value={profile.drinkingHabit}
            />

        </ProfileSection>

    );

}

export default LifestyleInformation;