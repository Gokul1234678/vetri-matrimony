import "../../assets/css/public/ProfilesSection.css";
import ProfileCard from "./ProfileCard";

import Pagination from "../common/Pagination";


// Temporary dummy data
const dummyProfiles = [

    {
        id: 1,
        fullName: "Priya"
    },

    {
        id: 2,
        fullName: "Kavya"
    },

    {
        id: 3,
        fullName: "Divya"
    },

    {
        id: 4,
        fullName: "Nivetha"
    },

    {
        id: 5,
        fullName: "Harini"
    },

    {
        id: 6,
        fullName: "Anitha"
    }

];

function ProfilesSection() {

    return (

        <section className="profiles-section">

            <div className="container">

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

                <div className="profiles-grid">

                    {

                        dummyProfiles.map((profile) => (

                            <ProfileCard

                                key={profile.id}

                                profile={profile}

                            />

                        ))

                    }

                </div>


                <Pagination />

            </div>

        </section>

    );

}

export default ProfilesSection;