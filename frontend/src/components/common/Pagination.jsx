import "../../assets/css/common/Pagination.css";

function Pagination() {

    return (

        <div className="pagination-container">

            <button className="page-btn">
                « Previous
            </button>

            <button className="page-number active">
                1
            </button>

            <button className="page-number">
                2
            </button>

            <button className="page-number">
                3
            </button>

            <button className="page-number">
                4
            </button>

            <button className="page-number">
                5
            </button>

            <span className="dots">
                ...
            </span>

            <button className="page-number">
                10
            </button>

            <button className="page-btn">
                Next »
            </button>

        </div>

    );

}

export default Pagination;