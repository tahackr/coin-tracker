import React, { useState } from "react";

function useSort(items) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    if (!items) return;

    const setSortColumn = function (value) {
        if (sortBy && value !== sortBy) {
            setSortBy(value);
            setSortOrder("ascending");
            return;
        }

        if (!sortOrder) {
            setSortOrder("ascending");
            setSortBy(value);
        }

        if (sortOrder === "ascending") {
            setSortOrder("descending");
            setSortBy(value);
        }

        if (sortOrder === "descending") {
            setSortOrder(null);
            setSortBy(null);
        }
    };

    let sortedData;
    if (sortOrder === "ascending") {
        if (sortBy === "change") {
            sortedData = items.toSorted(
                (a, b) => a.quote.USD.price - b.quote.USD.price
            );
        } else if (sortBy === "marketcap") {
            sortedData = items.toSorted(
                (a, b) => a.quote.USD.market_cap - b.quote.USD.market_cap
            );
        }
    } else if (sortOrder === "descending") {
        if (sortBy === "change") {
            sortedData = items.toSorted(
                (a, b) => b.quote.USD.price - a.quote.USD.price
            );
        } else if (sortBy === "marketcap") {
            sortedData = items.toSorted(
                (a, b) => b.quote.USD.price - a.quote.USD.price
            );
        }
    }

    return { sortOrder, setSortColumn, sortedData, sortBy };
}

export default useSort;
