import "../../assets/css/common/pageLoader.css";

function PageLoader({ text = "Loading..." }) {

    return (

        <div className="page-loader">

            <div className="loader-visual">

                {/* Rotating gradient ring */}
                <div className="loader-ring"></div>

                {/* Second ring, opposite direction */}
                <div className="loader-ring loader-ring-reverse"></div>

                {/* Pulsing heart */}
                <div className="loader-heart">
                    <i className="bi bi-heart-fill"></i>
                </div>

            </div>

            <p className="loader-text">
                {text}
            </p>

            <div className="loader-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

    );

}

export default PageLoader;