import { useEffect, useState } from "react";

import api from "../../services/api";

import districts from "../../config/districts";

import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

import UnlockedHero from "../../components/user/unlockedProfiles/UnlockedHero";
import UnlockedSearch from "../../components/user/unlockedProfiles/UnlockedSearch";
import UnlockedProfileGrid from "../../components/user/unlockedProfiles/UnlockedProfileGrid";

import "../../assets/css/user/unlockedProfiles/unlockedProfiles.css";

function UnlockedProfiles() {

    // ==========================
    // Search State
    // ==========================

    const [searchTerm, setSearchTerm] = useState("");

    const [district, setDistrict] = useState("");

    const [sortBy, setSortBy] = useState("recent");

    // ==========================
    // Pagination
    // ==========================

    const [currentPage, setCurrentPage] = useState(1);

    

    const [profiles, setProfiles] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);




    const fetchUnlockedProfiles = async () => {

        try {

            setLoading(true);

            const { data } = await api.get("/api/user/unlocked-profiles", {

                params: {

                    page: currentPage,

                    limit: 9,

                    search: searchTerm,

                    district,

                    sort: sortBy

                }

            });

            setProfiles(data.profiles);

            setTotalPages(data.totalPages);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchUnlockedProfiles();
    }, [currentPage, district, sortBy]);


    // ==========================
    // Search
    // ==========================

    const handleSearch = () => {

        setCurrentPage(1);

        fetchUnlockedProfiles();

    };

    // ==========================
    // Clear
    // ==========================

    const handleClear = () => {

        setSearchTerm("");

        setDistrict("");

        setSortBy("recent");

        setCurrentPage(1);

    };

    return (

        <>

            <UserNavbar />

            <main className="unlocked-profiles-page">

                <div className="container">

                    <UnlockedHero />

                    <UnlockedSearch

                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}

                        district={district}
                        setDistrict={setDistrict}

                        sortBy={sortBy}
                        setSortBy={setSortBy}

                        districts={districts}

                        onSearch={handleSearch}

                        onClear={handleClear}

                    />

                    <UnlockedProfileGrid

                        loading={loading}

                        profiles={profiles}

                        currentPage={currentPage}

                        totalPages={totalPages}

                        onPageChange={setCurrentPage}

                    />

                </div>

            </main>

            <Footer />

        </>

    );

}

export default UnlockedProfiles;