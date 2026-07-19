import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../assets/css/user/ProfileDetails.css";

import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

import LockedProfileCard from "../../components/user/LockedProfileCard";
import FullProfile from "../../components/user/FullProfile";

import api from "../../services/api";

function ProfileDetails() {

    // ===========================================
    // Get Profile ID From URL
    // ===========================================
    const { id } = useParams();

    // ===========================================
    // States
    // ===========================================
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [isUnlocked, setIsUnlocked] = useState(false);

    const [credits, setCredits] = useState(0);

    // ===========================================
    // Fetch Profile
    // ===========================================
    const fetchProfile = async () => {

        try {

            setLoading(true);

            const { data } = await api.get(

                `/profiles/${id}`

            );

            if (data.success) {

                setProfile(data.profile);

                setIsUnlocked(data.isUnlocked);

                setCredits(data.credits);

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================================
    // Unlock Profile
    // ===========================================
    const unlockProfile = async () => {

        try {

            const { data } = await api.post(

                `/profiles/${id}/unlock`

            );

            if (data.success) {

                // Reload profile after unlock
                fetchProfile();

            }

        }

        catch (error) {

            console.error(error);

        }

    };

    // ===========================================
    // Load Profile
    // ===========================================
    useEffect(() => {

        fetchProfile();

    }, [id]);

    return (

        <>

            <UserNavbar />

            <section className="profile-details-page">

                <div className="container">

                    {

                        loading ?

                            (

                                <h3 className="profile-loading">

                                    Loading...

                                </h3>

                            )

                            :

                            isUnlocked ?

                                (

                                    <FullProfile

                                        profile={profile}

                                    />

                                )

                                :

                                (

                                    <LockedProfileCard

                                        profile={profile}

                                        credits={credits}

                                        onUnlock={unlockProfile}

                                    />

                                )

                    }

                </div>

            </section>

            <Footer />

        </>

    );

}

export default ProfileDetails;