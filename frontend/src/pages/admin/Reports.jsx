import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "../../assets/css/admin/reports.css";

import AdminLayout from "../../layouts/AdminLayout";
import Pagination from "../../components/common/Pagination";
import LoadingOverlay from "../../components/common/LoadingOverlay";

import ReportFilters from "../../components/admin/ReportFilters";
import ReportList from "../../components/admin/ReportList";

import api from "../../services/api";

function Reports() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalReports: 0,
        limit: 10,
    });

    // ==========================================
    // FETCH REPORTS
    // ==========================================

    const fetchReports = async (
        page = 1,
        searchValue = search,
        fromDateValue = fromDate,
        toDateValue = toDate
    ) => {

        try {

            setLoading(true);

            const response = await api.get(
                "/admin/reports/profile-views",
                {
                    params: {
                        page,
                        limit: 10,
                        search: searchValue,
                        fromDate: fromDateValue,
                        toDate: toDateValue,
                    },
                }
            );

            const data = response.data;

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Failed to fetch reports"
                );

            }

            setReports(data.reports);
            setPagination(data.pagination);

        } catch (error) {

            console.error(
                "Fetch Reports Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load reports"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        fetchReports();

    }, []);


    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = () => {

        fetchReports(
            1,
            search,
            fromDate,
            toDate
        );

    };


    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    const handleClear = () => {

        setSearch("");
        setFromDate("");
        setToDate("");

        fetchReports(
            1,
            "",
            "",
            ""
        );

    };


    // ==========================================
    // PAGE CHANGE
    // ==========================================

    const handlePageChange = (page) => {

        fetchReports(
            page,
            search,
            fromDate,
            toDate
        );

    };


    return (

        <AdminLayout>

            <LoadingOverlay
                show={loading}
                message="Loading reports..."
            />

            <div className="reports-page">

                <div className="reports-page-header">

                    <div>

                        <h1>
                            Reports
                        </h1>

                        <p>
                            View profile unlock activity.
                        </p>

                    </div>

                </div>

                <ReportFilters
                    search={search}
                    setSearch={setSearch}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                />

                <ReportList
                    reports={reports}
                    pagination={pagination}
                />

                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />

            </div>

        </AdminLayout>

    );

}

export default Reports;