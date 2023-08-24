import React, { useState } from "react";
import { TableRow, TableCell } from "@mui/material";
// Change the imports before release
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearIcon from "@mui/icons-material/Clear";
import ControlDelete from "./DeleteModal";

function TableBodyRow({ coin }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const calculateDecimalPoints = function (value) {
        const [int, decimal] = String(value).split(".");
        let startIndex;

        if (int < 1) {
            for (let i = 0; i < decimal.length; i++) {
                if (Number(decimal[i]) !== 0) {
                    startIndex = i;
                    break;
                }
            }
            return Number([int, decimal].join(".")).toFixed(startIndex + 2);
        }

        return Number([int, decimal].join(".")).toFixed(2);
    };
    const {
        name,
        quote: {
            USD: { price, percent_change_24h, market_cap },
        },
    } = coin;

    calculateDecimalPoints(price);

    return (
        <>
            {isModalOpen && (
                <ControlDelete coin={coin} setIsModalOpen={setIsModalOpen} />
            )}

            <TableRow>
                <TableCell className="!text-left !p-2 sticky left-0 bg-white !font-semibold">
                    {name}
                </TableCell>
                <TableCell className="!text-end !p-2">
                    ${calculateDecimalPoints(price)}
                </TableCell>
                <TableCell
                    className={`!text-end !p-2 ${
                        percent_change_24h > 0
                            ? "!text-green-600"
                            : "!text-red-600"
                    } `}
                >
                    {percent_change_24h < 0 ? (
                        <ArrowDropDownIcon />
                    ) : (
                        <ArrowDropUpIcon />
                    )}
                    {percent_change_24h.toFixed(2).replace("-", "")}%
                </TableCell>
                <TableCell className="!text-end !p-2">
                    $
                    {new Intl.NumberFormat(navigator.language, {
                        notation: "compact",
                    })
                        .format(market_cap.toFixed(0))
                        .replace("-", "")}
                </TableCell>
                <TableCell className="!text-center !p-0 cursor-pointer">
                    <span onClick={() => setIsModalOpen(true)}>
                        <ClearIcon className="text-red-600" />
                    </span>
                </TableCell>
            </TableRow>
        </>
    );
}

export default TableBodyRow;
