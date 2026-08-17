import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../../services/api";

import "../../assets/css/admin/dashboard.css";

// import LoadingOverlay from "../../components/common/LoadingOverlay";


import AdminLayout from "../../layouts/AdminLayout";

function Dashboard() {

    const [stats, setStats] = useState({

        totalProfiles: 0,

        maleProfiles: 0,

        femaleProfiles: 0,

        totalCreditsSold: 0

    });

    const [recentProfiles, setRecentProfiles] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const { data } = await api.get("/admin/dashboard");

            setStats(data.stats);

            setRecentProfiles(data.recentProfiles);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <AdminLayout>

                <h3 className="text-center">Loading dashboard...</h3>

            </AdminLayout>

        );

    }
    return (

        <AdminLayout>

            {/* ==========================
                Statistics Cards
            ========================== */}

            <section className="dashboard-stats">

                <div className="stat-card total-card">

                    <div className="stat-icon">

                        <i className="bi bi-people-fill"></i>

                    </div>

                    <div>

                        <h4>Total Profiles</h4>

                        <h2>{stats.totalProfiles}</h2>

                        <p>All profiles in the system</p>

                    </div>

                </div>

                <div className="stat-card male-card">

                    <div className="stat-icon">

                        <i className="bi bi-person-fill"></i>

                    </div>

                    <div>

                        <h4>Male Profiles</h4>

                        <h2>{stats.maleProfiles}</h2>

                        <p>Male profiles</p>

                    </div>

                </div>

                <div className="stat-card female-card">

                    <div className="stat-icon">

                        <i className="bi bi-person-standing-dress"></i>

                    </div>

                    <div>

                        <h4>Female Profiles</h4>

                        <h2>{stats.femaleProfiles}</h2>

                        <p>Female profiles</p>

                    </div>

                </div>

                <div className="stat-card credit-card">

                    <div className="stat-icon">

                        <i className="bi bi-coin"></i>

                    </div>

                    <div>

                        <h4>Total Credits Sold</h4>

                        <h2>{stats.totalCreditsSold}</h2>

                        <p>Total credits sold</p>

                    </div>

                </div>

            </section>

            {/* ==========================
                Quick Actions
            ========================== */}

            <section className="quick-actions">

                <h2>

                    Quick Actions

                </h2>

                <div className="action-grid">

                    <Link

                        to="/admin/profiles/create"

                        className="action-card green"

                    >

                        <div className="action-icon">

                            <i className="bi bi-person-plus-fill"></i>

                        </div>

                        <div>

                            <h3>Create Profile</h3>

                            <p>

                                Add a new member profile

                            </p>

                        </div>

                        <i className="bi bi-arrow-right action-arrow"></i>

                    </Link>

                    <Link

                        to="/admin/profiles"

                        className="action-card blue"

                    >

                        <div className="action-icon">

                            <i className="bi bi-people-fill"></i>

                        </div>

                        <div>

                            <h3>Manage Profiles</h3>

                            <p>

                                View and manage profiles

                            </p>

                        </div>

                        <i className="bi bi-arrow-right action-arrow"></i>

                    </Link>

                    <Link

                        to="/admin/reports"

                        className="action-card orange"

                    >

                        <div className="action-icon">

                            <i className="bi bi-bar-chart-fill"></i>

                        </div>

                        <div>

                            <h3>Reports</h3>

                            <p>

                                Check reports and summaries

                            </p>

                        </div>

                        <i className="bi bi-arrow-right action-arrow"></i>

                    </Link>

                </div>

            </section>

            {/*Recently Added Profiles*/}

            <section className="recent-profiles">

                <div className="section-header">

                    <h2>

                        Recently Added Profiles

                    </h2>

                    <Link

                        to="/admin/profiles"

                        className="view-all-btn"

                    >

                        View All

                        <i className="bi bi-arrow-right"></i>

                    </Link>

                </div>

                <div className="table-wrapper">

                    <table className="profile-table">

                        <thead>

                            <tr>

                                <th>Profile ID</th>

                                <th>Name</th>

                                <th>Gender</th>

                                <th>Added On</th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                recentProfiles.length > 0 ?
                                    recentProfiles.map((profile) => (
                                        <tr key={profile._id}>
                                            <td>{profile.profileId}</td>
                                            <td>
                                                <div className="profile-name-cell">
                                                    <div className="profile-avatar">
                                                        {profile.fullName?.charAt(0)}
                                                    </div>
                                                    {profile.fullName}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`gender-badge ${profile.gender?.toLowerCase()}`}>
                                                    <i className={`bi ${profile.gender?.toLowerCase() === "male" ? "bi-person-fill" : "bi-person-standing-dress"}`}></i>
                                                    {profile.gender}
                                                </span>
                                            </td>
                                            <td>
                                                {
                                                    new Date(profile.createdAt)
                                                        .toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })
                                                }
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: "center", padding: "30px" }}>
                                                No profiles found.
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>

                    </table>

                </div>

            </section>

        </AdminLayout>

    );

}

export default Dashboard;