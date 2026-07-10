import { useState } from "react";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/public/Hero";
import SearchSection from "../../components/public/SearchSection";

import ProfilesSection from "../../components/public/ProfilesSection";
import RegisterCTA from "../../components/public/RegisterCTA";

function Home() {
// ==========================
// Search Form State
// User edits these values
// ==========================

const [searchFilters, setSearchFilters] = useState({

    gender: "",

    ageFrom: "",

    ageTo: "",

    religion: "",

    caste: ""

});

// ==========================
// Applied Filters
// Used for API requests
// ==========================

const [appliedFilters, setAppliedFilters] = useState({

    gender: "",

    ageFrom: "",

    ageTo: "",

    religion: "",

    caste: ""

});

// ==========================
// Apply Search Filters
// ==========================

const handleSearch = () => {

    setAppliedFilters(searchFilters);

};

    return (

        <>

            <Navbar />

            <Hero />

<SearchSection

    filters={searchFilters}

    setFilters={setSearchFilters}

    onSearch={handleSearch}

/>

            <ProfilesSection

    filters={appliedFilters}

/>

            <RegisterCTA />
            <Footer />

        </>

    );

}

export default Home;