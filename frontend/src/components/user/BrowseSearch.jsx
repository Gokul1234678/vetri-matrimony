import { RELIGIONS } from "../../config/religions";
import { CASTES } from "../../config/castes";
import "../../assets/css/user/BrowseSearch.css";

function BrowseSearch({filters,setFilters,onSearch}) {

    // ==========================
    // Handle Input Change
    // ==========================

    const handleChange = (e) => {

        setFilters({

            ...filters,

            [e.target.name]: e.target.value

        });

    };

    // ==========================
    // Clear Filters
    // ==========================

  const clearFilters = () => {

    const resetFilters = {

       search: "",

        gender: "",

        ageFrom: "",

        ageTo: "",

        religion: "",

        caste: "",

        district: ""

    };

    setFilters(resetFilters);

    onSearch(resetFilters);

};

    return (

        <div className="browse-search">

            <div className="browse-search-grid">

                {/* Profile ID */}

                <div className="search-group">

                    <label>

    Search

</label>

                    <input

    type="text"

    name="search"

    placeholder="Profile ID or Name"

    value={filters.search}

    onChange={handleChange}

/>

                </div>
                   

                {/* Looking For */}

                <div className="search-group">

                    <label>

                        Looking For

                    </label>

                    <select

                        name="gender"

                        value={filters.gender}

                        onChange={handleChange}

                    >

                        <option value="">

                            All

                        </option>

                        <option value="female">

                            Bride 👰

                        </option>

                        <option value="male">

                            Groom  🤵

                        </option>

                    </select>

                </div>

                {/* Age */}

                <div className="search-group">

                    <label>

                        Age

                    </label>

                    <div className="age-wrapper">

                        <select

                            name="ageFrom"

                            value={filters.ageFrom}

                            onChange={handleChange}

                        >

                            <option value="">

                                From

                            </option>

                            {

                                Array.from(

                                    { length: 43 },

                                    (_, i) => (

                                        <option

                                            key={i}

                                            value={18 + i}

                                        >

                                            {18 + i}

                                        </option>

                                    )

                                )

                            }

                        </select>

                        <span>

                            To

                        </span>

                        <select

                            name="ageTo"

                            value={filters.ageTo}

                            onChange={handleChange}

                        >

                            <option value="">

                                To

                            </option>

                            {

                                Array.from(

                                    { length: 43 },

                                    (_, i) => (

                                        <option

                                            key={i}

                                            value={18 + i}

                                        >

                                            {18 + i}

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>

                </div>

                {/* Religion */}

                <div className="search-group">

                    <label>

                        Religion

                    </label>

                    <select

                        name="religion"

                        value={filters.religion}

                        onChange={handleChange}

                    >

                        <option value="">

                            All Religions

                        </option>

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

                    <label>

                        Caste

                    </label>

                    <select

                        name="caste"

                        value={filters.caste}

                        onChange={handleChange}

                    >

                        <option value="">

                            All Castes

                        </option>

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

                {/* District */}

                <div className="search-group">

                    <label>

                        District

                    </label>

                    <input

                        type="text"

                        name="district"

                        placeholder="District"

                        value={filters.district}

                        onChange={handleChange}

                    />

                </div>

            </div>

            {/* Buttons */}

            <div className="browse-search-buttons">

                <button

    className="search-btn"

    onClick={onSearch}

>

                    <i className="bi bi-search"></i>

                    Search

                </button>

                <button

                    className="clear-btn"

                    onClick={clearFilters}

                >

                    <i className="bi bi-arrow-clockwise"></i>

                    Clear Filters

                </button>

            </div>

        </div>

    );

}

export default BrowseSearch;