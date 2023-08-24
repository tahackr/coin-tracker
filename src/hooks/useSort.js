import { useState } from "react";

function useSort(items) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    if (!items) return;
    console.log(items);

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
                (a, b) =>
                    a.quote.USD.percent_change_24h -
                    b.quote.USD.percent_change_24h
            );
        } else if (sortBy === "marketcap") {
            sortedData = items.toSorted(
                (a, b) => a.quote.USD.market_cap - b.quote.USD.market_cap
            );
        }
    } else if (sortOrder === "descending") {
        if (sortBy === "change") {
            sortedData = items.toSorted(
                (a, b) =>
                    b.quote.USD.percent_change_24h -
                    a.quote.USD.percent_change_24h
            );
        } else if (sortBy === "marketcap") {
            sortedData = items.toSorted(
                (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap
            );
        }
    }

    return { sortOrder, setSortColumn, sortedData, sortBy };
}

export default useSort;
