import { useEffect, useState } from "react";

import "../../assets/css/public/ProfilesSection.css";

import ProfileCard from "./ProfileCard";

import Pagination from "../common/Pagination";

import api from "../../services/api";

function ProfilesSection({ filters }) {

    // ==========================
    // States
    // ==========================

    const [profiles, setProfiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    // ==========================
    // Fetch Profiles
    // ==========================

    const fetchProfiles = async () => {

        try {

            setLoading(true);

            // ==========================
            // Build Query Parameters
            // ==========================

            const params = new URLSearchParams();

            params.append("page", currentPage);

            // Pagination
            params.append("limit", 3); // change to 8 later

            // Gender
            if (filters.gender) {

                params.append("gender", filters.gender);

            }

            // Religion
            if (filters.religion) {

                params.append("religion", filters.religion);

            }

            // Caste
            if (filters.caste) {

                params.append("caste", filters.caste);

            }

            // Age
            if (filters.ageFrom) {

                params.append("ageFrom", filters.ageFrom);

            }

            if (filters.ageTo) {

                params.append("ageTo", filters.ageTo);

            }

            const { data } = await api.get(

                `/public/profiles?${params.toString()}`

            );

            if (data.success) {

                setProfiles(data.profiles);

                setTotalPages(data.totalPages);

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Load Profiles
    // ==========================

    useEffect(() => {

        fetchProfiles();

    }, [currentPage]);


 useEffect(() => {

    if (currentPage === 1) {

        fetchProfiles();

    } else {

        setCurrentPage(1);

    }

}, [filters]);

    return (

        <section className="profiles-section">

            <div className="container">

                {/* Heading */}

                <div className="section-heading">

                    <div className="heading-decoration">

                        <span className="line"></span>

                        <i className="bi bi-heart-fill heart-icon"></i>

                        <span className="line"></span>

                    </div>

                    <h2>Our Profiles</h2>

                    <p>

                        Find your perfect match from our trusted profiles

                    </p>

                </div>

                {/* Loading */}

                {

                    loading ?

                        (

                            <h4
                                style={{
                                    textAlign: "center"
                                }}
                            >

                                Loading Profiles...

                            </h4>

                        )

                        :

                        profiles.length === 0 ?

                            (

                                <h4
                                    style={{
                                        textAlign: "center"
                                    }}
                                >

                                    No Profiles Found

                                </h4>

                            )

                            :

                            (

                                <>

                                    <div className="profiles-grid">

                                        {

                                            profiles.map((profile) => (

                                                <ProfileCard

                                                    key={profile._id}

                                                    profile={profile}

                                                />

                                            ))

                                        }

                                    </div>

                                    <Pagination

                                        currentPage={currentPage}

                                        totalPages={totalPages}

                                        onPageChange={setCurrentPage}

                                    />

                                </>

                            )

                }

            </div>

        </section>

    );

}

export default ProfilesSection;