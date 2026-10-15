import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function FamilyInformation({ profile }) {
    const siblings = profile.siblings || {};

    return (
        <ProfileSection
            title="Family Information"
            icon="bi bi-people-fill"
        >
            <ProfileField
                label="Father's Name"
                value={profile.fatherName}
            />
            <ProfileField
                label="Father's Occupation"
                value={profile.fatherOccupation}
            />
            <ProfileField
                label="Mother's Name"
                value={profile.motherName}
            />
            <ProfileField
                label="Mother's Occupation"
                value={profile.motherOccupation}
            />
            <ProfileField
                label="Elder Brothers"
                value={siblings.eb?.total}
            />
            <ProfileField
                label="Elder Brothers Married"
                value={siblings.eb?.married}
            />
            <ProfileField
                label="Younger Brothers"
                value={siblings.yb?.total}
            />
            <ProfileField
                label="Younger Brothers Married"
                value={siblings.yb?.married}
            />
            <ProfileField
                label="Elder Sisters"
                value={siblings.es?.total}
            />
            <ProfileField
                label="Elder Sisters Married"
                value={siblings.es?.married}
            />
            <ProfileField
                label="Younger Sisters"
                value={siblings.ys?.total}
            />
            <ProfileField
                label="Younger Sisters Married"
                value={siblings.ys?.married}
            />
        </ProfileSection>
    );
}

export default FamilyInformation;