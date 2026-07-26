import "../../../assets/css/user/unlockedProfiles/search.css";

function UnlockedSearch({

    searchTerm,
    setSearchTerm,

    district,
    setDistrict,

    sortBy,
    setSortBy,

    districts = [],

    onSearch,
    onClear

}) {

    return (

        <section className="unlocked-search">

            <div className="search-grid">

                {/* Search */}

                <div className="search-field">

                    <label>
                        Search
                    </label>

                    <div className="search-input">

                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            placeholder="Search by Name or Profile ID"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>

                </div>

                {/* District */}

                <div className="search-field">

                    <label>
                        District
                    </label>

                    <select
                        value={district}
                        onChange={(e) =>
                            setDistrict(e.target.value)
                        }
                    >

                        <option value="">
                            All Districts
                        </option>

                        {

                            districts.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))

                        }

                    </select>

                </div>

                {/* Sort */}

                <div className="search-field">

                    <label>
                        Sort By
                    </label>

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                    >

                        <option value="recent">
                            Recently Unlocked
                        </option>

                        <option value="oldest">
                            Oldest First
                        </option>

                        <option value="name">
                            Name (A-Z)
                        </option>

                    </select>

                </div>

                {/* Buttons */}

                <div className="search-buttons">

                    <button
                        className="search-btn"
                        onClick={onSearch}
                    >

                        <i className="bi bi-search"></i>

                        Search

                    </button>

                    <button
                        className="clear-btn"
                        onClick={onClear}
                    >

                        <i className="bi bi-arrow-clockwise"></i>

                        Clear

                    </button>

                </div>

            </div>

        </section>

    );

}

export default UnlockedSearch;