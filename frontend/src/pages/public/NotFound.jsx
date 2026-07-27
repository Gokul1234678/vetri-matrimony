import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../../assets/css/public/notFound.css";

import brokenHeart from "../../assets/images/broken-heart.png";

function NotFound() {

    const { isAuthenticated } = useAuth();

    return (

        <section className="not-found-page">

            <div className="not-found-card">

                <img
                    src={brokenHeart}
                    alt="Page Not Found"
                    className="not-found-image"
                />

                <span className="error-badge">

                    Error 404

                </span>

                <h1>

                    Oops! This Match Wasn't Found

                </h1>

                <p>

                    The page you're looking for doesn't exist,
                    may have been moved,
                    or the link is incorrect.

                </p>

                <div className="not-found-buttons">

                    <Link
                        to="/"
                        className="home-btn"
                    >

                        <i className="bi bi-house-door-fill"></i>

                        Back to Home

                    </Link>

                    {

                        isAuthenticated && (

                            <Link
                                to="/browse-profiles"
                                className="browse-btn"
                            >

                                <i className="bi bi-search-heart"></i>

                                Browse Profiles

                            </Link>

                        )

                    }

                </div>

            </div>

        </section>

    );

}

export default NotFound;