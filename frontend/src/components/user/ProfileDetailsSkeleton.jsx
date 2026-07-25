import "../../assets/css/user/ProfileDetailsSkeleton.css";

function ProfileDetailsSkeleton() {

    return (

        <div className="profile-skeleton">

            {/* Header Skeleton */}
            <div className="skeleton-header">

                <div className="skeleton-shimmer skeleton-image"></div>

                <div className="skeleton-header-right">

                    <div className="skeleton-shimmer skeleton-line skeleton-title"></div>
                    <div className="skeleton-shimmer skeleton-line skeleton-subtitle"></div>
                    <div className="skeleton-shimmer skeleton-line skeleton-location"></div>

                    <div className="skeleton-thumbs">
                        <div className="skeleton-shimmer skeleton-thumb"></div>
                        <div className="skeleton-shimmer skeleton-thumb"></div>
                        <div className="skeleton-shimmer skeleton-thumb"></div>
                        <div className="skeleton-shimmer skeleton-thumb"></div>
                        <div className="skeleton-shimmer skeleton-thumb"></div>
                    </div>

                </div>

            </div>

            {/* Section Cards Skeleton */}
            <div className="skeleton-grid">

                {
                    Array.from({ length: 6 }).map((_, i) => (
                        <div className="skeleton-card" key={i}>

                            <div className="skeleton-card-title">
                                <div className="skeleton-shimmer skeleton-icon"></div>
                                <div className="skeleton-shimmer skeleton-line skeleton-card-heading"></div>
                            </div>

                            <div className="skeleton-shimmer skeleton-line"></div>
                            <div className="skeleton-shimmer skeleton-line"></div>
                            <div className="skeleton-shimmer skeleton-line"></div>
                            <div className="skeleton-shimmer skeleton-line skeleton-short"></div>

                        </div>
                    ))
                }

            </div>

        </div>

    );

}

export default ProfileDetailsSkeleton;