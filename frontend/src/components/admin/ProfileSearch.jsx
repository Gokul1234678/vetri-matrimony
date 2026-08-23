
import "../../assets/css/admin/profile-search.css";

function ProfileSearch({
    search,
    setSearch,
    handleSearch,
    handleClear,
}) {

    return (

        <section className="profile-search-section">

            {/* Header */}

            <div className="profile-search-header">

                <div className="profile-search-title">

                    <i className="bi bi-search"></i>

                    <h2>
                        Search & Filters
                    </h2>

                </div>

            </div>


            {/* Search Fields */}

            <div className="profile-search-grid">

                {/* Search */}

                <div className="profile-search-field">

                    <label htmlFor="profileSearch">
                        Search Profiles
                    </label>

                    <div className="profile-search-input-wrapper">

                        <i className="bi bi-search"></i>

                        <input
                            id="profileSearch"
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search by ID, name or mobile number"
                        />

                    </div>

                </div>

                {/* Buttons */}

                <div className="profile-search-actions">

                    <button
                        type="button"
                        className="profile-search-btn"
                        onClick={handleSearch}
                    >

                        <i className="bi bi-search"></i>

                        Search

                    </button>


                    <button
                        type="button"
                        className="profile-clear-btn"
                        onClick={handleClear}
                    >

                        <i className="bi bi-arrow-counterclockwise"></i>

                        Clear

                    </button>

                </div>

            </div>

        </section>

    );

}

export default ProfileSearch;