import * as React from "react";
import { TableRow as TR, TableCell as TD } from "@mui/material";

function TableBodyRow({ data }) {
    return (
        <TR className="text-center border-b">
            <th className="text-left">{data.name}</th>
            <TD>{data.price}</TD>
            <TD>{data.change}</TD>
        </TR>
    );
}

export default TableBodyRow;
