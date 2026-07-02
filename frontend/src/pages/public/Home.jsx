import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/public/Hero";
import SearchSection from "../../components/public/SearchSection";

import ProfilesSection from "../../components/public/ProfilesSection";
import RegisterCTA from "../../components/public/RegisterCTA";

function Home() {

    return (

        <>

            <Navbar />

            <Hero />

            <SearchSection />

            <ProfilesSection />
            <RegisterCTA />
            <Footer />

        </>

    );

}

export default Home;