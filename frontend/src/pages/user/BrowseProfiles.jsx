import { useEffect, useState } from "react";

import "../../assets/css/user/BrowseProfiles.css";

import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

import BrowseSearch from "../../components/user/BrowseSearch";

import coupleImage from "../../assets/images/couple-photo.png";

import api from "../../services/api";

import UserProfileCard from "../../components/user/UserProfileCard";

import Pagination from "../../components/common/Pagination";


function BrowseProfiles() {
    const [filters, setFilters] = useState({

        search: "",

        gender: "",

        ageFrom: "",

        ageTo: "",

        religion: "",

        caste: "",

        district: ""

    });


    const [profiles, setProfiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [totalProfiles, setTotalProfiles] = useState(0);

    const fetchProfiles = async () => {

        try {

            setLoading(true);

            const params = new URLSearchParams();

            params.append("page", currentPage);

            params.append("limit", 10);

            if (filters.search) {

                params.append("search", filters.search);

            }

            if (filters.gender) {

                params.append("gender", filters.gender);

            }

            if (filters.ageFrom) {

                params.append("ageFrom", filters.ageFrom);

            }

            if (filters.ageTo) {

                params.append("ageTo", filters.ageTo);

            }

            if (filters.religion) {

                params.append("religion", filters.religion);

            }

            if (filters.caste) {

                params.append("caste", filters.caste);

            }

            if (filters.district) {

                params.append("district", filters.district);

            }

            const { data } = await api.get(

                `/profiles?${params.toString()}`

            );

            if (data.success) {

                setProfiles(data.profiles);

                setTotalPages(data.totalPages);

                setTotalProfiles(data.totalProfiles);

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

        fetchProfiles();

    }, [currentPage]);

    useEffect(() => {

        setCurrentPage(1);

    }, [filters]);




    return (

        <>

            <UserNavbar />

            <section className="browse-page">

                <div className="container">

                   

                    {/* Page Banner */}
<div className="browse-banner">
    <div className="browse-banner-content">
        <h1>
            Browse Profiles
            <span className="title-divider"></span>
        </h1>
        <p>
            Find your perfect match from our trusted and verified profiles.
        </p>
    </div>
    <div className="browse-banner-image">
        <img src={coupleImage} alt="Couple" />
    </div>
</div>

                    {/* Search */}

                    <BrowseSearch

                        filters={filters}

                        setFilters={setFilters}

                        onSearch={fetchProfiles}

                    />
                    {/* ======================================
    Results Header
====================================== */}

                    <div className="browse-results-header">

                        <div>

                            <h3>
                                Browse Profiles
                            </h3>

                            <p>
                                {totalProfiles} Profiles Found
                            </p>

                        </div>

                    </div>
                    {/* Profile Section */}

                    <div className="browse-profiles-container">

                        {

                            loading ?

                                (

                                    <h4 className="dashboard-loading">

                                        Loading Profiles...

                                    </h4>

                                )

                                :

                                profiles.length === 0 ?

                                    (

                                        <h4 className="dashboard-loading">

                                            No Profiles Found

                                        </h4>

                                    )

                                    :

                                    (

                                        <>

                                            <div className="profiles-grid">

                                                {

                                                    profiles.map((profile) => (

                                                        <UserProfileCard

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

                </div>

            </section>

            <Footer />

        </>

    );

}

export default BrowseProfiles;