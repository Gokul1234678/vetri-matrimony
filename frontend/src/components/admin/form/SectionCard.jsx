function SectionCard({
    title,
    number,
    icon = "bi-person",
    children,
    className = "",
}) {
    return (
        <section className={`form-section ${className}`}>

            <div className="form-section-header">

                <div className="form-section-title">

                    <div className="form-section-icon">
                        <i className={`bi ${icon}`}></i>
                    </div>

                    <h2>
                        {number && (
                            <span className="section-number">
                                {number}.
                            </span>
                        )}

                        {title}
                    </h2>

                </div>

            </div>

            <div className="form-section-body">
                {children}
            </div>

        </section>
    );
}

export default SectionCard;