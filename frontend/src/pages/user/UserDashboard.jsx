import { useEffect, useState } from "react";

import "../../assets/css/user/Dashboard.css";

import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";

import UserProfileCard from "../../components/user/UserProfileCard";
import Pagination from "../../components/common/Pagination";

import { useAuth } from "../../context/AuthContext";

import api from "../../services/api";
import coupleImage from "../../assets/images/couple-photo.png";


import { Link } from "react-router-dom";

function UserDashboard() {

    const { user } = useAuth();

    // for testing 
    const LIMIT = 2;

    // for production
    // const LIMIT = 8;

    const [profiles, setProfiles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Latest Profiles
    // ==========================

    const fetchProfiles = async () => {

        try {

            setLoading(true);

            const { data } = await api.get(

                `/profiles?page=${currentPage}&limit=${LIMIT}`

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

    useEffect(() => {

        fetchProfiles();

    }, [currentPage]);

    return (

        <>

            <UserNavbar />

            <section className="dashboard">

                <div className="container">

                    {/* Welcome */}

                    <div className="dashboard-welcome">

                        {/* Left Content */}

                        <div className="welcome-content">

                            <h2>

                                Welcome Back,

                                <span>

                                    {" "}

                                    {user?.username}

                                    👋

                                </span>

                            </h2>

                            <p>

                                Continue your journey to find your perfect life partner from our trusted matrimonial profiles.

                            </p>

                            <Link

                                to="/browse-profiles"

                                className="browse-btn"

                            >

                                Browse Profiles

                                <i className="bi bi-arrow-right ms-2"></i>

                            </Link>

                        </div>

                        {/* Right Image */}

                        <div className="welcome-image">

                            <img

                                src={coupleImage}

                                alt="Couple"

                            />

                        </div>

                    </div>

                    {/* Statistics */}
                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <div className="stat-icon icon-green">
                                <i className="bi bi-coin"></i>
                            </div>
                            <div className="stat-text">
                                <p className="stat-label">Credits Remaining</p>
                                <h3>{user?.credits ?? 0}</h3>
                                <p className="stat-desc">Use credits to view profiles</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon icon-gold">
                                <i className="bi bi-eye-fill"></i>
                            </div>
                            <div className="stat-text">
                                <p className="stat-label">Profiles Unlocked</p>
                                <h3>0</h3>
                                <p className="stat-desc">Profiles you have unlocked</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon icon-brown">
                                <i className="bi bi-calendar-check"></i>
                            </div>
                            <div className="stat-text">
                                <p className="stat-label">Member Since</p>
                                <h3>2026</h3>
                                <p className="stat-desc">Happy Matching!</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon icon-teal">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <div className="stat-text">
                                <p className="stat-label">Trust &amp; Security</p>
                                <h3>100%</h3>
                                <p className="stat-desc">Verified &amp; Secure Profiles</p>
                            </div>
                        </div>
                    </div>

                    {/* Latest Profiles */}

                    <div className="dashboard-section-heading">

                        <h3>

                            Latest Profiles

                        </h3>

                        <p>

                            Newly added verified matrimonial profiles

                        </p>

                    </div>

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

                    {/* Need Credits */}

                    <div className="credits-cta">

                        <div>

                            <h3>

                                Need More Credits?

                            </h3>

                            <p>

                                Contact our matrimony office to recharge your account and unlock more profiles.

                            </p>

                        </div>

                        <button>

                            Contact Admin

                        </button>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default UserDashboard;