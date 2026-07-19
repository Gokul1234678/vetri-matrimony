function ProfileField({

    label,

    value

}) {

    return (

        <div className="profile-field">

            <span className="profile-label">

                {label}

            </span>

            <span className="profile-colon">

                :

            </span>

            <span className="profile-value">

                {value || "-"}

            </span>

        </div>

    );

}

export default ProfileField;