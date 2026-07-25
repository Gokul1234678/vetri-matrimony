import "../../assets/css/user/profileStats.css";
function ProfileStats({ profile }) {

    const stats = [

        {
            icon: "bi bi-person-vcard-fill",
            color: "#2E7D32",
            title: "Profile ID",
            value: profile.profileId,
        },

        {
            icon: "bi bi-shield-check",
            color: "#7B1FA2",
            title: "Profile Status",
            value: "Active",
        },

        {
            icon: "bi bi-coin",
            color: "#F9A825",
            title: "Credits Remaining",
            value: profile.credits,
        }

    ];

    return (

        <>

            <div className="my-profile-title">

                <div>
                   
                    <h2>My Profile</h2>


                    <p>

                        This is your matrimonial profile.

                        <br />

                        Contact our office for any updates.

                    </p>

                </div>

                <div className="profile-stats">

                    {

                        stats.map((item, index) => (

                            <div
                                className="profile-stat-card"
                                key={index}
                            >

                                <div
                                    className="profile-stat-icon"
                                    style={{
                                        backgroundColor: `${item.color}20`,
                                        color: item.color
                                    }}
                                >

                                    <i className={item.icon}></i>

                                </div>

                                <div>

                                    <small>

                                        {item.title}

                                    </small>

                                    <h4>

                                        {item.value}

                                    </h4>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default ProfileStats;