import "../../../assets/css/user/unlockedProfiles/hero.css";

import unlockIllustration from "../../../assets/images/unlocked-hero.png";

function UnlockedHero() {

    return (

        <section className="unlocked-hero">

            <div className="unlocked-hero-content">

                <div className="unlocked-hero-left">

                    <div className="section-decoration">

                        <span></span>

                        <i className="bi bi-unlock-fill"></i>

                        <span></span>

                    </div>

                    <h1>
                        Unlocked Profiles
                    </h1>

                    <p>
                        Profiles you have already unlocked.
                        <br />
                        No additional credits are required to
                        view these profiles.
                    </p>

                </div>

                <div className="unlocked-hero-right">

                    <img
                        src={unlockIllustration}
                        alt="Unlocked Profiles"
                    />

                </div>

            </div>

        </section>

    );

}

export default UnlockedHero;