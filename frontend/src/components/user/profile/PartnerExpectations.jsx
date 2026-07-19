import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function PartnerExpectations({ profile }) {

    const partner = profile.partnerExpectations || {};

    return (

        <ProfileSection
            title="Partner Expectations"
            icon="bi bi-heart-fill"
        >

            <ProfileField
                label="Preferred Age"
                value={partner.preferredAge}
            />

            

           

            <ProfileField
                label="Religion"
                value={partner.preferredReligion}
            />

            <ProfileField
                label="Caste"
                value={partner.preferredCaste}
            />

            <ProfileField
                label="Education"
                value={partner.preferredEducation}
            />

           

            <ProfileField
                label="Location"
                value={partner.preferredLocation}
            />

          

        </ProfileSection>

    );

}

export default PartnerExpectations;