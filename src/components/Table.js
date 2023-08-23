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
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        24h %
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        Market Cap
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {coins?.map((coin) => (
                    <TableBodyRow key={uuidv4()} coin={coin} />
                ))}
            </TableBody>
        </MUITable>
    );
}

export default Table;
