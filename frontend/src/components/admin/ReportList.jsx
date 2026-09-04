function ReportList({
    reports,
    pagination,
}) {

    // Format date
    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // Calculate serial number based on pagination
    const getSerialNumber = (index) => {

        return (
            (pagination.currentPage - 1) *
            pagination.limit +
            index +
            1
        );

    };


    return (

        <section className="report-list-section">

            {/* Header */}

            <div className="report-list-header">

                <div>

                    <h2>
                        Profile Unlock Activity
                    </h2>

                    <p>
                        View profiles unlocked using credits.
                    </p>

                </div>


                <div className="total-reports">

                    Total Records:

                    <strong>
                        {pagination?.totalReports || 0}
                    </strong>

                </div>

            </div>


            {/* Table */}

            <div className="report-table-wrapper">

                <table className="report-table">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>
                                User (Viewer)
                            </th>

                            <th>
                                Unlocked Profile
                            </th>

                            <th>
                                Unlock Date
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {reports.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="no-reports"
                                >

                                    <i className="bi bi-inbox"></i>

                                    <p>
                                        No unlock activity found.
                                    </p>

                                </td>

                            </tr>

                        ) : (

                            reports.map(
                                (report, index) => (

                                    <tr
                                        key={report._id}
                                    >

                                        {/* Serial Number */}

                                        <td>

                                            {getSerialNumber(index)}

                                        </td>


                                        {/* Viewer */}

                                        <td>

                                            <div className="report-user">

                                                {report.viewer
                                                    ?.profilePhoto ? (

                                                    <img
                                                        src={
                                                            report.viewer
                                                                .profilePhoto
                                                        }
                                                        alt={
                                                            report.viewer
                                                                .fullName
                                                        }
                                                        className="report-user-image"
                                                    />

                                                ) : (

                                                    <div className="report-user-placeholder">

                                                        <i className="bi bi-person"></i>

                                                    </div>

                                                )}


                                                <div className="report-user-info">

                                                    <strong>

                                                        {report.viewer
                                                            ?.fullName ||
                                                            "Unknown"}

                                                    </strong>

                                                    <span>

                                                        {report.viewer
                                                            ?.profileId ||
                                                            "N/A"}

                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Unlocked Profile */}

                                        <td>

                                            <div className="report-user">

                                                {report.viewedUser
                                                    ?.profilePhoto ? (

                                                    <img
                                                        src={
                                                            report.viewedUser
                                                                .profilePhoto
                                                        }
                                                        alt={
                                                            report.viewedUser
                                                                .fullName
                                                        }
                                                        className="report-user-image"
                                                    />

                                                ) : (

                                                    <div className="report-user-placeholder">

                                                        <i className="bi bi-person"></i>

                                                    </div>

                                                )}


                                                <div className="report-user-info">

                                                    <strong>

                                                        {report.viewedUser
                                                            ?.fullName ||
                                                            "Unknown"}

                                                    </strong>

                                                    <span>

                                                        {report.viewedUser
                                                            ?.profileId ||
                                                            "N/A"}

                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Date */}

                                        <td>

                                            <span className="unlock-date">

                                                <i className="bi bi-calendar3"></i>

                                                {formatDate(
                                                    report.viewedAt
                                                )}

                                            </span>

                                        </td>

                                    </tr>

                                )

                            )

                        )}

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default ReportList;