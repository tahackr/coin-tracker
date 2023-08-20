import React from "react";
import { TableRow as TR, TableCell as TD } from "@mui/material";

function TableBodyRow({ data: { price, change, name } }) {
    return (
        <TR className="text-center border-b">
            <th className="text-left pl-4">{name}</th>
            <TD>{price}</TD>
            <TD>{change}</TD>
        </TR>
    );
}

export default TableBodyRow;
