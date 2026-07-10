import "../../assets/css/common/Pagination.css";

function Pagination({

    currentPage,

    totalPages,

    onPageChange

}) {

    // Hide pagination if only one page
    if (totalPages <= 1) return null;

    // =====================================
    // Generate Page Numbers
    // =====================================

    const getPages = () => {

        const pages = [];

        // Small number of pages
        if (totalPages <= 7) {

            for (let i = 1; i <= totalPages; i++) {

                pages.push(i);

            }

            return pages;

        }

        // Near Beginning
        if (currentPage <= 4) {

            pages.push(1, 2, 3, 4, 5, "...", totalPages);

            return pages;

        }

        // Near End
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

        // Middle

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

            {/* Showing Page */}

            <div className="page-info">

                Showing Page

                <strong> {currentPage} </strong>

                of

                <strong> {totalPages} </strong>

            </div>

                        {/* Pagination */}

            <div className="pagination-container">

                {/* Previous */}

                <button

                    className="page-btn"

                    disabled={currentPage === 1}

                    onClick={() => {

                        onPageChange(currentPage - 1);

                        window.scrollTo({

                            top: document.querySelector(".profiles-section").offsetTop - 100,

                            behavior: "smooth"

                        });

                    }}

                >

                    « Previous

                </button>

                {/* Page Numbers */}

                {

                    pages.map((page, index) => (

                        page === "..." ?

                            (

                                <span

                                    key={index}

                                    className="dots"

                                >

                                    ...

                                </span>

                            )

                            :

                            (

                                <button

                                    key={page}

                                    className={`page-number ${currentPage === page ? "active" : ""}`}

                                    onClick={() => {

                                        onPageChange(page);

                                        window.scrollTo({

                                            top: document.querySelector(".profiles-section").offsetTop - 100,

                                            behavior: "smooth"

                                        });

                                    }}

                                >

                                    {page}

                                </button>

                            )

                    ))

                }

                {/* Next */}

                <button

                    className="page-btn"

                    disabled={currentPage === totalPages}

                    onClick={() => {

                        onPageChange(currentPage + 1);

                        window.scrollTo({

                            top: document.querySelector(".profiles-section").offsetTop - 100,

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