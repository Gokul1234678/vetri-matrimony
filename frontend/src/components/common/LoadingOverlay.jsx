function LoadingOverlay({
    show,
    message = "Please wait...",
}) {
    if (!show) {
        return null;
    }

    return (
        <>
            <style>
                {`
                    .loading-overlay {
                        position: fixed;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.45);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                    }

                    .loading-box {
                        min-width: 260px;
                        padding: 30px;
                        background: #ffffff;
                        border-radius: 16px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 18px;
                        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
                    }

                    .loading-box .spinner-border {
                        width: 45px;
                        height: 45px;
                        color: #f7b733;
                    }

                    .loading-box p {
                        margin: 0;
                        color: #2b160d;
                        font-size: 16px;
                        font-weight: 600;
                        text-align: center;
                    }
                `}
            </style>

            <div className="loading-overlay">
                <div className="loading-box">

                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p>{message}</p>

                </div>
            </div>
        </>
    );
}

export default LoadingOverlay;