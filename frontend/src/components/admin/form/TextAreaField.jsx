function TextAreaField({

    label,

    name,

    value,

    onChange,

    placeholder = "",

    rows = 5,

    required = false,

    error = "",

    disabled = false,

    readOnly = false,

    ...rest

}) {

    return (

        <div className="form-group">

            <label
                htmlFor={name}
                className="form-label"
            >

                {label}

                {

                    required &&

                    <span className="required-star">

                        *

                    </span>

                }

            </label>

            <textarea

                id={name}

                name={name}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                rows={rows}

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

export default TextAreaField;