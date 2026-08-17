import { useRef } from "react";

function FileUploadField({

    label,

    name,

    onChange,

    required = false,

    error = "",

    multiple = false,

    accept = "image/*",

    preview = [],

    onRemove,

    disabled = false

}) {

    const fileInputRef = useRef(null);

    return (

        <div className="form-group">

            <label className="form-label">

                {label}

                {

                    required &&

                    <span className="required-star">*</span>

                }

            </label>

            <input

                ref={fileInputRef}

                type="file"

                name={name}

                accept={accept}

                multiple={multiple}

                disabled={disabled}

                className={`form-control ${error ? "is-invalid" : ""}`}

                onChange={onChange}

            />

            {

                error &&

                <div className="invalid-feedback">

                    {error}

                </div>

            }

            {

                preview.length > 0 && (

                    <div className="image-preview-grid">

                        {

                            preview.map((image, index) => (

                                <div

                                    key={index}

                                    className="preview-card"

                                >

                                    <img

                                        src={image}

                                        alt="Preview"

                                    />

                                    {

                                        onRemove && (

                                            <button

                                                type="button"

                                                className="remove-image-btn"

                                                onClick={() => onRemove(index)}

                                            >

                                                <i className="bi bi-x-lg"></i>

                                            </button>

                                        )

                                    }

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default FileUploadField;