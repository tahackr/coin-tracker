import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
    Table as MUITable,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import TableBodyRow from "./TableBodyRow";
import useFetch from "../hooks/useFetch";
import Skeleton from "./Skeleton";

function Table() {
    const [isScrolled, setIsScrolled] = useState(false);

    const { data: coins, isFetching, error } = useFetch("/src/data/coins.json");

    const handler = (e) => {
        const { scrollLeft } = e.target;

        if (scrollLeft) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    if (error) {
        return createPortal(
            <div className="fixed inset-0 bg-white ">
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
        <MUITable
            stickyHeader
            onScroll={(e) => handler(e)}
            className="!block !p-0 h-full overflow-auto"
        >
            <TableHead>
                <TableRow>
                    <TableCell
                        className={`!text-left !p-2 !font-semibold sticky left-0 top-0 !z-20 bg-white ${
                            isScrolled && "scroll-shadow"
                        } `}
                    >
                        Name
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        Price
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        1h %
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        24h %
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        7d %
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        Market Cap
                    </TableCell>
                    <TableCell className="!text-end !p-2 !font-semibold sticky top-0 z-10 bg-white">
                        Volume 24h
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {coins?.map((coin, index) => (
                    <TableBodyRow
                        key={`${coin.name}${index}`}
                        coin={coin}
                        isScrolled={isScrolled}
                    />
                ))}
            </TableBody>
        </MUITable>
    );
}

export default Table;
