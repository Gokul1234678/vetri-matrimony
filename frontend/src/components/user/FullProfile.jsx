import { Link } from "react-router-dom";

import "../../assets/css/user/profile/profile.css";

import ProfileHeader from "./profile/ProfileHeader";
import PersonalInformation from "./profile/PersonalInformation";
import LocationInformation from "./profile/LocationInformation";
import EducationCareer from "./profile/EducationCareer";
import FamilyInformation from "./profile/FamilyInformation";
import HoroscopeInformation from "./profile/HoroscopeInformation";
import LifestyleInformation from "./profile/LifestyleInformation";
import ContactInformation from "./profile/ContactInformation";
import AboutMe from "./profile/AboutMe";
import PartnerExpectations from "./profile/PartnerExpectations";



function FullProfile({ profile }) {

    return (

        <div className="full-profile">



            <Link
                to="/browse-profiles"
                className="back-btn"
            >
                <i className="bi bi-arrow-left"></i>
                Back to Browse Profiles
            </Link>





            <ProfileHeader

                profile={profile}

            />

            <div className="profile-sections-grid">

                <PersonalInformation profile={profile} />

                <LocationInformation profile={profile} />

                <EducationCareer profile={profile} />

                <FamilyInformation profile={profile} />

                <HoroscopeInformation profile={profile} />
                <LifestyleInformation profile={profile} />
                <ContactInformation profile={profile} />
            </div>

            <AboutMe profile={profile} />
            <PartnerExpectations profile={profile} />

        </div>

    );

}

export default FullProfile;