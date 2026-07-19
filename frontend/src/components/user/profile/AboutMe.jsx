import ProfileSection from "./ProfileSection";

function AboutMe({ profile }) {

    return (

        <ProfileSection
            title="About Me"
            icon="bi bi-chat-left-text-fill"
        >

            <p className="about-me-text">

                {profile.aboutMe || "No description available."}

            </p>

        </ProfileSection>

    );

}

export default AboutMe;