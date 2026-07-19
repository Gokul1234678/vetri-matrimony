import "../../../assets/css/user/profile/section.css";

function ProfileSection({

    title,

    icon,

    color = "green",

    subtitle,

    children

}) {

    return (

        <div className="profile-section-card">

            <div className="profile-section-title">

                <div className={`profile-section-icon icon-${color}`}>

                    <i className={icon}></i>

                </div>

                <h3>

                    {title}

                </h3>

                {
                    subtitle &&
                    <span className="profile-section-subtitle">
                        {subtitle}
                    </span>
                }

            </div>

            <div className="profile-section-content">

                {children}

            </div>

        </div>

    );

}

export default ProfileSection;