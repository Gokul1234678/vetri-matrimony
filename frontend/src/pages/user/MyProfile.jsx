

import { useEffect, useState } from "react";

import PageLoader from "../../components/common/PageLoader";

import "../../assets/css/user/MyProfile.css";


import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

import ProfileStats from "../../components/user/ProfileStats";
import MyProfileHeader from "../../components/user/MyProfileHeader";


import PersonalInformation from "../../components/user/profile/PersonalInformation";
import LocationInformation from "../../components/user/profile/LocationInformation";
import EducationCareer from "../../components/user/profile/EducationCareer";
import FamilyInformation from "../../components/user/profile/FamilyInformation";
import HoroscopeInformation from "../../components/user/profile/HoroscopeInformation";
import LifestyleInformation from "../../components/user/profile/LifestyleInformation";
import AboutMe from "../../components/user/profile/AboutMe";
import PartnerExpectations from "../../components/user/profile/PartnerExpectations";
import ContactInformation from "../../components/user/profile/ContactInformation";

import CreditsSummary from "../../components/user/CreditsSummary";
import ProfileChangesNotice from "../../components/user/ProfileChangesNotice";

import api from "../../services/api";

function MyProfile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {

        try {

            setLoading(true);

            const { data } = await api.get("/user/profile");

            if (data.success) {

                setProfile(data.profile);

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    return (

        <>

            <UserNavbar />

            <section className="my-profile-page">

                <div className="container">

                    {

                        loading ?

                            <PageLoader text="Loading your profile..." />
                            :

                            <>

                                <ProfileStats profile={profile} />

                                <MyProfileHeader profile={profile} />


                                <div className="profile-sections-grid">
                                    <PersonalInformation profile={profile} />
                                    <LocationInformation profile={profile} />
                                    <EducationCareer profile={profile} />
                                    <FamilyInformation profile={profile} />
                                    <HoroscopeInformation profile={profile} />
                                    <LifestyleInformation profile={profile} />
                                    <ContactInformation
                                        profile={profile}
                                        title="Registered Contact Information"
                                        subtitle="These are the contact details currently registered with Vetri Matrimony."
                                        showUnlockNotice={false}
                                    />
                                </div>

                                <AboutMe profile={profile} />

                                <PartnerExpectations profile={profile} />
                                <CreditsSummary profile={profile} />
                                <ProfileChangesNotice />
                            </>

                    }

                </div>

            </section>

            <Footer />

        </>

    );

}

export default MyProfile;