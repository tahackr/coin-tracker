//import axios from "axios";
import React from "react";
import {
    Table as TableMUI,
    TableHead,
    TableBody,
    TableRow,
    TableCell as TD,
} from "@mui/material";
import TableBodyRow from "./TableBodyRow";
import useFetch from "../hooks/use-fetch";

function Table() {
    //todos
    //const renderedRows = data.map((data) => <TableBodyRow data={data} />);
    // data maplerken her data objesinde quote.USD ye bak
    // burda .price .percent_change_1h .percent_change_24h .percent_change_7d

    const { data, isFetching, error } = useFetch("http://localhost:3004/data");
    // Skeleton for isFetching???
    let renderedRows;
    let content;
    if (error) {
        content = <div>{error.message}</div>;
    } else {
        if (data) {
            renderedRows = data.map((data) => <TableBodyRow data={data} />);
        }

        content = (
            <TableMUI className="block p-2">
                <TableHead>
                    <TableRow>
                        <TD>Name</TD>
                        <TD>Price</TD>
                        <TD>Change</TD>
                    </TableRow>
                </TableHead>
                <TableBody>{renderedRows}</TableBody>
            </TableMUI>
        );
    }

    return content;
}

export default Table;
