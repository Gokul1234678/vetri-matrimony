import "../../assets/css/public/SearchSection.css";

function SearchSection() {

    return (

        <section className="search-section">

            <div className="search-container">

                <div className="search-grid">

                    {/* Looking For */}

                    <div className="search-group">

                        <label>Looking For</label>

                        <select>

                            <option>Bride</option>

                            <option>Groom</option>

                        </select>

                    </div>

                    {/* Age From */}

                    <div className="search-group">

                        <label>Age</label>

                        <div className="age-wrapper">

                            <select>

                                {
                                    Array.from({ length: 43 }, (_, i) => (

                                        <option key={i}>

                                            {18 + i}

                                        </option>

                                    ))
                                }

                            </select>

                            <span>To</span>

                            <select defaultValue={60}>

                                {
                                    Array.from({ length: 43 }, (_, i) => (

                                        <option key={i}>

                                            {18 + i}

                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                    </div>

                    {/* Religion */}

                    <div className="search-group">

                        <label>Religion</label>

                        <select>

                            <option>All Religions</option>

                            <option>Hindu</option>

                            <option>Christian</option>

                            <option>Muslim</option>

                        </select>

                    </div>

                    {/* Caste */}

                    <div className="search-group">

                        <label>Caste</label>

                        <select>

                            <option>All Castes</option>

                        </select>

                    </div>

                    {/* Search */}

                    <div className="search-btn-wrapper">

                        <button>

                            Search

                            <i className="bi bi-search ms-2"></i>

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default SearchSection;