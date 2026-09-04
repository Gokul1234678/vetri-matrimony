import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

import Pagination from "../../components/common/Pagination";

import "../../assets/css/admin/profile-list.css";

import AdminLayout from "../../layouts/AdminLayout";
import ProfileSearch from "../../components/admin/ProfileSearch";
import ProfileList from "../../components/admin/ProfileList";

// to used for adding credits to a profile
import AddCreditModal from "../../components/admin/AddCreditModal";

import DeleteProfileModal from "../../components/admin/DeleteProfileModal";

function ManageProfiles() {
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProfiles: 0,
        limit: 8,
    });
    const [search, setSearch] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedProfile, setSelectedProfile] = useState(null);
    const [credits, setCredits] = useState("");
    const [creditLoading, setCreditLoading] = useState(false);

    const [profileToDelete, setProfileToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    // ============================
    // Get Profiles
    // ============================

    const fetchProfiles = async (
        searchValue = "",
        page = 1
    ) => {

        try {

            setLoading(true);

            const response = await api.get(
                "/admin/profiles",
                {
                    params: {
                        search: searchValue,
                        page,
                        limit: 8,
                    },
                }
            );

            const data = response.data;

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Failed to fetch profiles"
                );

            }

            setProfiles(data.profiles);
            setPagination(data.pagination);

        } catch (error) {

            console.error(
                "Fetch Profiles Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load profiles"
            );

        } finally {

            setLoading(false);

        }

    };


    const handleSearch = () => {

        fetchProfiles(search);

    };

    const handleClear = () => {

        setSearch("");

        fetchProfiles("");

    };

    const handlePageChange = (page) => {

        fetchProfiles(search, page);

    };

    const handleCreditsClick = (profile) => {
        setSelectedProfile(profile);
        setCredits("");
    };

    const handleAddCredit = async () => {
        const amount = Number(credits);

        if (!amount || amount <= 0) {
            toast.error("Please enter a valid credit amount.");
            return;
        }

        try {
            setCreditLoading(true);

            const response = await api.patch(
                `/admin/profiles/${selectedProfile._id}/credits`,
                {
                    credits: amount,
                }
            );

            const data = response.data;

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to add credits"
                );
            }

            // Update credits in current table
            setProfiles((currentProfiles) =>
                currentProfiles.map((profile) =>
                    profile._id === selectedProfile._id
                        ? {
                            ...profile,
                            credits: data.profile.credits,
                        }
                        : profile
                )
            );

            toast.success(data.message);

            setSelectedProfile(null);
            setCredits("");

        } catch (error) {

            console.error(
                "Add Credits Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to add credits"
            );

        } finally {
            setCreditLoading(false);
        }
    };

    const handleCloseCreditModal = () => {
        if (creditLoading) return;

        setSelectedProfile(null);
        setCredits("");
    };



    const handleDeleteClick = (profile) => {
        setProfileToDelete(profile);
    };


    const handleDeleteConfirm = async () => {
        if (!profileToDelete) return;

        try {
            setDeleting(true);

            const response = await api.delete(
                `/admin/profiles/${profileToDelete._id}`
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Failed to delete profile"
                );
            }

            toast.success(
                response.data.message ||
                "Profile deleted successfully"
            );

            setProfileToDelete(null);

            fetchProfiles(
                search,
                pagination.currentPage
            );

        } catch (error) {

            console.error(
                "Delete Profile Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete profile"
            );

        } finally {

            setDeleting(false);

        }
    };

    // ============================
    // Load Profiles
    // ============================

    useEffect(() => {

        fetchProfiles();

    }, []);



    // ============================
    // Page
    // ============================
    return (
        <AdminLayout>

            <div className="manage-profiles-page">

                {loading ? (

                    <div className="profiles-loading">
                        <div className="profiles-loading-spinner"></div>

                        <p>Loading profiles...</p>
                    </div>

                ) : (

                    <>
                        <div className="manage-profiles-header">

                            <div>
                                <h1>
                                    Manage Profiles
                                </h1>

                                <p>
                                    Manage all matrimonial profiles.
                                </p>
                            </div>

                        </div>

                        <ProfileSearch
                            search={search}
                            setSearch={setSearch}
                            handleSearch={handleSearch}
                            handleClear={handleClear}
                        />

                        <ProfileList
                            profiles={profiles}
                            pagination={pagination}
                            onAddCredit={handleCreditsClick}
                            onDelete={handleDeleteClick}
                        />

                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                        <DeleteProfileModal
                            profile={profileToDelete}
                            onClose={() => setProfileToDelete(null)}
                            onConfirm={handleDeleteConfirm}
                            deleting={deleting}
                        />

                        {selectedProfile && (
                            <AddCreditModal
                                profile={selectedProfile}
                                credits={credits}
                                setCredits={setCredits}
                                onClose={handleCloseCreditModal}
                                onSubmit={handleAddCredit}
                                loading={creditLoading}
                            />
                        )}
                    </>

                )}

            </div>

        </AdminLayout>
    );

}

export default ManageProfiles;