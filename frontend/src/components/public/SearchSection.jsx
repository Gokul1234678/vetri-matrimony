import "../../assets/css/public/SearchSection.css";
import { RELIGIONS } from "../../config/religions";
import { CASTES } from "../../config/castes";


function SearchSection({

    filters,

    setFilters,

    onSearch

}) {

    return (

        <section className="search-section">

            <div className="search-container">

                <div className="search-grid">

                    {/* Gender */}

                    <div className="search-group">

                        <label>Looking For</label>

                        <select

                            value={filters.gender}

                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    gender: e.target.value
                                })
                            }

                        >

                            <option value="">All</option>

                            <option value="male">Male</option>

                            <option value="female">Female</option>

                        </select>

                    </div>

                    {/* Age */}

                    <div className="search-group">

                        <label>Age</label>

                        <div className="age-wrapper">

                            <select

                                value={filters.ageFrom}

                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        ageFrom: e.target.value
                                    })
                                }

                            >

                                <option value="">From</option>

                                {

                                    Array.from({ length: 43 }, (_, i) => (

                                        <option
                                            key={i}
                                            value={18 + i}
                                        >

                                            {18 + i}

                                        </option>

                                    ))

                                }

                            </select>

                            <span>To</span>

                            <select

                                value={filters.ageTo}

                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        ageTo: e.target.value
                                    })
                                }

                            >

                                <option value="">To</option>

                                {

                                    Array.from({ length: 43 }, (_, i) => (

                                        <option
                                            key={i}
                                            value={18 + i}
                                        >

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

                        <select
                            value={filters.religion}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    religion: e.target.value
                                })
                            }
                        >

                            <option value="">All Religions</option>

                            {

                                RELIGIONS.map((religion) => (

                                    <option
                                        key={religion}
                                        value={religion}
                                    >

                                        {religion}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Caste */}

                    <div className="search-group">

                        <label>Caste</label>

                        <select
                            value={filters.caste}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    caste: e.target.value
                                })
                            }
                        >

                            <option value="">All Castes</option>

                            {

                                CASTES.map((caste) => (

                                    <option
                                        key={caste}
                                        value={caste}
                                    >

                                        {caste}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Search Button */}

                    <div className="search-btn-wrapper">

                        <button

                            type="button"

                            onClick={onSearch}

                        >

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