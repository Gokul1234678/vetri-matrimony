function ReportFilters({
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    search,
    setSearch,
    handleSearch,
    handleClear,
}) {
    return (
        <section className="report-filters-section">

            <div className="report-filters-title">

                <i className="bi bi-funnel"></i>

                <h2>
                    Filters
                </h2>

            </div>

            <div className="report-filters-grid">

                {/* From Date */}

                <div className="report-filter-group">

                    <label htmlFor="fromDate">
                        From Date
                    </label>

                    <input
                        id="fromDate"
                        type="date"
                        value={fromDate}
                        onChange={(e) =>
                            setFromDate(e.target.value)
                        }
                    />

                </div>


                {/* To Date */}

                <div className="report-filter-group">

                    <label htmlFor="toDate">
                        To Date
                    </label>

                    <input
                        id="toDate"
                        type="date"
                        value={toDate}
                        onChange={(e) =>
                            setToDate(e.target.value)
                        }
                    />

                </div>


                {/* Search */}

                <div className="report-filter-group report-search-group">

                    <label htmlFor="search">
                        Search
                    </label>

                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search viewer or unlocked profile"
                    />

                </div>


                {/* Actions */}

                <div className="report-filter-actions">

                    <button
                        type="button"
                        className="report-search-btn"
                        onClick={handleSearch}
                    >
                        <i className="bi bi-search"></i>

                        Search
                    </button>


                    <button
                        type="button"
                        className="report-clear-btn"
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

export default ReportFilters;