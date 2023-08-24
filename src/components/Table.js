import React from "react";
import { createPortal } from "react-dom";
import {
    Table as MUITable,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import TableBodyRow from "./TableBodyRow";
import Skeleton from "./Skeleton";
import { useFetchCoinsQuery } from "../store";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useSort from "../hooks/useSort";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HeightIcon from "@mui/icons-material/Height";

function Table() {
    const coinIds = useSelector((state) => state.coinIds);

    localStorage.setItem("coins", JSON.stringify(coinIds));

    const { data, isFetching, error } = useFetchCoinsQuery(coinIds);

    const coins = [];
    if (data) {
        for (const coin of Object.values(data.data)) {
            coins.push(coin);
        }
    }
    const { sortOrder, sortedData, setSortColumn, sortBy } = useSort(coins);
    const iconToRender = function (sortOrder) {
        if (!sortOrder) return;

        if (sortOrder === "ascending") {
            return <ExpandMoreIcon />;
        } else {
            return <ExpandLessIcon />;
        }
    };

    if (error) {
        return createPortal(
            <div className="fixed inset-0 bg-white z-50">
                <h1 className="font-bold text-2xl p-4">
                    OOPS! Something went wrong.
                </h1>
                <p className="flex gap-4 p-4">
                    {error.code} {error.message}
                </p>
            </div>,
            document.body
        );
    }

    if (isFetching) {
        return <Skeleton />;
    }

    return (
        <MUITable stickyHeader className="px-2 h-full overflow-auto">
            <TableHead>
                <TableRow>
                    <TableCell className="!text-left !p-2 !font-semibold sticky left-0 top-0 !z-20 bg-white">
                        Name
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        Price
                    </TableCell>
                    <TableCell
                        onClick={() => setSortColumn("change")}
                        className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white cursor-pointer"
                    >
                        {sortBy !== "change" && (
                            <HeightIcon
                                className="
                        !p-1"
                            />
                        )}
                        {sortBy === "change" && iconToRender(sortOrder)}24h %
                    </TableCell>
                    <TableCell
                        onClick={() => setSortColumn("marketcap")}
                        sx={{ padding: "0px", paddingLeft: "24px" }}
                        className="!text-end pl-6 !font-semibold sticky top-0 z-10 bg-white cursor-pointer"
                    >
                        {sortBy === "marketcap" && iconToRender(sortOrder)}
                        {sortBy !== "marketcap" && (
                            <HeightIcon
                                className="
                        !p-1"
                            />
                        )}
                        Market Cap
                    </TableCell>
                    <TableCell className="!p-0 sticky top-0 z-10 bg-white"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData
                    ? sortedData?.map((coin) => (
                          <TableBodyRow key={uuidv4()} coin={coin} />
                      ))
                    : coins?.map((coin) => (
                          <TableBodyRow key={uuidv4()} coin={coin} />
                      ))}
            </TableBody>
        </MUITable>
    );
}

export default Table;
