import "../../assets/css/common/Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, "...", totalPages);
            return pages;
        }

        if (currentPage >= totalPages - 3) {
            pages.push(
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
            return pages;
        }

        pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
        );
        return pages;
    };

    const pages = getPages();

    return (
        <>
            <div className="page-info">
                Showing Page
                <strong> {currentPage} </strong>
                of
                <strong> {totalPages} </strong>
            </div>
            <div className="pagination-container">
                <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => {
                        onPageChange(currentPage - 1);
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}
                >
                    « Previous
                </button>
                {pages.map((page, index) =>
                    page === "..." ? (
                        <span key={index} className="dots">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`page-number ${currentPage === page ? "active" : ""}`}
                            onClick={() => {
                                onPageChange(page);
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });
                            }}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        onPageChange(currentPage + 1);
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}
                >
                    Next »
                </button>
            </div>
        </>
    );
}

export default Pagination;