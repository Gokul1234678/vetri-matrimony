function InputField({

    label,

    name,

    type = "text",

    value,

    onChange,

    placeholder = "",

    required = false,

    error = "",

    disabled = false,

    readOnly = false,

    ...rest

}) {

    return (

        <div className="form-group">

            <label htmlFor={name} className="form-label">

                {label}

                {

                    required &&

                    <span className="required-star">*</span>

                }

            </label>

            <input

                id={name}

                name={name}

                type={type}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                disabled={disabled}

                readOnly={readOnly}

                className={`form-control ${error ? "is-invalid" : ""}`}

                {...rest}

            />

            {

                error && (

                    <div className="invalid-feedback">

                        {error}

                    </div>

                )

            }

        </div>

    );

}

export default InputField;