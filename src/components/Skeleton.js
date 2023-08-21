import React from "react";

function Skeleton() {
    const boxes = Array(6)
        .fill(0)
        .map((_, i) => (
            <div
                key={i}
                className={
                    "relative h-10  overflow-hidden bg-gray-200 rounded ml-2 mr-2 mb-2"
                }
            >
                <div
                    className={
                        "absolute animate-shimmer inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-white to-gray-200"
                    }
                />
            </div>
        ));

    return boxes;
}

export default Skeleton;
