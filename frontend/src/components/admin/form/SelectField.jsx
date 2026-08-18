function SelectField({
    label,
    name,
    value = "",
    onChange,
    options = [],
    placeholder = "Select",
    required = false,
    error = "",
    disabled = false,
    ...rest
}) {
    return (
        <div className="form-group">

            <label
                htmlFor={name}
                className="form-label"
            >
                {label}

                {required && (
                    <span className="required-star">
                        *
                    </span>
                )}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`custom-select ${
                    error ? "select-error" : ""
                }`}
                {...rest}
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <div className="field-error">
                    {error}
                </div>
            )}

        </div>
    );
}

export default SelectField;