import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/user/ProfileDetails.css";
import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";
import LockedProfileCard from "../../components/user/LockedProfileCard";
import FullProfile from "../../components/user/FullProfile";
import ProfileDetailsSkeleton from "../../components/user/ProfileDetailsSkeleton";
import api from "../../services/api";

function ProfileDetails() {
    const { user, loading: authLoading, loadUser } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [credits, setCredits] = useState(0);

    // ===========================================
    // Redirect Admin To Admin Profile View
    // ===========================================
    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (user?.role === "admin") {
            navigate(`/admin/profiles/view/${id}`, {
                replace: true
            });
        }
    }, [user, authLoading, id, navigate]);

    // ===========================================
    // Fetch Profile
    // ===========================================
    const fetchProfile = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(`/profiles/${id}`);

            if (data.success) {
                setProfile(data.profile);
                setIsUnlocked(data.isUnlocked);
                setCredits(data.credits);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ===========================================
    // Unlock Profile
    // ===========================================
    const unlockProfile = async () => {
        try {
            const { data } = await api.post(`/profiles/${id}/unlock`);

            if (data.success) {
                await Promise.all([
                    loadUser(),
                    fetchProfile()
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================================
    // Load Profile
    // ===========================================
    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (user?.role === "admin") {
            return;
        }

        fetchProfile();
    }, [id, authLoading, user]);

    // ===========================================
    // Admin Redirect Loading
    // ===========================================
    if (authLoading || user?.role === "admin") {
        return <ProfileDetailsSkeleton />;
    }

    return (
        <>
            <UserNavbar />

            <section className="profile-details-page">
                <div className="container">
                    {loading ? (
                        <ProfileDetailsSkeleton />
                    ) : isUnlocked ? (
                        <FullProfile profile={profile} />
                    ) : (
                        <LockedProfileCard
                            profile={profile}
                            credits={credits}
                            onUnlock={unlockProfile}
                        />
                    )}
                </div>
            </section>

            <Footer isUser />
        </>
    );
}

export default ProfileDetails;