import ProfileSection from "./ProfileSection";
import ProfileField from "./ProfileField";

function LocationInformation({ profile }) {

    return (

        <ProfileSection

            title="Location Information"

            icon="bi bi-geo-alt-fill"

            color="green"

        >

            <ProfileField

                label="Address"

                value={profile.address}

            />

            <ProfileField

                label="District"

                value={profile.district}

            />

            <ProfileField

                label="State"

                value={profile.state}

            />

            <ProfileField

                label="Country"

                value={profile.country}

            />

        </ProfileSection>

    );

}

export default LocationInformation;