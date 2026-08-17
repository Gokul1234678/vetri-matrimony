function SectionCard({

    title,

    children,

    className = ""

}) {

    return (

        <section className={`form-section ${className}`}>

            <div className="form-section-header">

                <h2>{title}</h2>

            </div>

            <div className="form-section-body">

                {children}

            </div>

        </section>

    );

}

export default SectionCard;