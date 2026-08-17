import SectionCard from "../form/SectionCard";
import InputField from "../form/InputField";

function AccountSection({

    formData,

    errors,

    handleChange

}) {

    return (

        <SectionCard title="Login Account">

            <div className="form-grid">

                <InputField

                    label="Username"

                    name="username"

                    value={formData.username}

                    onChange={handleChange}

                    required

                    error={errors.username}

                />

                <InputField

                    label="Password"

                    type="password"

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                    required

                    error={errors.password}

                />

            </div>

        </SectionCard>

    );

}

export default AccountSection;