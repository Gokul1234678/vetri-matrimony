import UserNavbar from "../../components/common/UserNavbar";
import Footer from "../../components/common/Footer";
import PlanCards from "../../components/plans/PlanCards";

function UserPlans() {
    return (
        <>
            <UserNavbar />

            <PlanCards contactPath="/contact-us" />

            <Footer isUser />
        </>
    );
}

export default UserPlans;