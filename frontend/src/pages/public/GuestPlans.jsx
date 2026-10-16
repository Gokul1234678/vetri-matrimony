import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import PlanCards from "../../components/plans/PlanCards";

function GuestPlans() {
    return (
        <>
            <Navbar />

            <PlanCards contactPath="/guest-contact-us" />

            <Footer />
        </>
    );
}

export default GuestPlans;