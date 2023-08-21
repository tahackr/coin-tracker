import React from "react";
import { TableRow, TableCell } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function TableBodyRow({ coin, isScrolled }) {
    const {
        name,
        quote: {
            USD: {
                price,
                volume_24h,
                percent_change_1h,
                percent_change_24h,
                percent_change_7d,
                market_cap,
            },
        },
    } = coin;

    return (
        <TableRow>
            <TableCell
                className={`!text-left !p-2 sticky left-0 bg-white !font-semibold ${
                    isScrolled && "scroll-shadow"
                } `}
            >
                {name}
            </TableCell>
            <TableCell className="!text-end !p-2">${price}</TableCell>
            <TableCell
                className={`!text-end !p-2 ${
                    percent_change_1h > 0 ? "!text-green-600" : "!text-red-600"
                } `}
            >
                {percent_change_1h < 0 ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowDropUpIcon />
                )}
                {percent_change_1h.replace("-", "")}%
            </TableCell>
            <TableCell
                className={`!text-end !p-2 ${
                    percent_change_24h > 0 ? "!text-green-600" : "!text-red-600"
                } `}
            >
                {percent_change_24h < 0 ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowDropUpIcon />
                )}
                {percent_change_24h.replace("-", "")}%
            </TableCell>
            <TableCell
                className={`!text-end !p-2 ${
                    percent_change_7d > 0 ? "!text-green-600" : "!text-red-600"
                } `}
            >
                {percent_change_7d < 0 ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowDropUpIcon />
                )}
                {percent_change_7d.replace("-", "")}%
            </TableCell>
            <TableCell className="!text-end !p-2">${volume_24h}</TableCell>
            <TableCell className="!text-end !p-2">${market_cap}</TableCell>
        </TableRow>
    );
}

export default TableBodyRow;
