//import axios from "axios";
import * as React from "react";
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
    const data = [
        {
            name: "Bitcoin",
            price: 50000,
            change: 2.5,
        },
        {
            name: "Ethereum",
            price: 3300,
            change: -1.2,
        },
        {
            name: "Ripple",
            price: 1.05,
            change: -0.5,
        },
    ];
    //todos
    //const renderedRows = data.map((data) => <TableBodyRow data={data} />);
    // data maplerken her data objesinde quote.USD ye bak
    // burda .price .percent_change_1h .percent_change_24h .percent_change_7d

    const {
        data: deneme,
        isFetching,
        error,
    } = useFetch("v1/cryptocurrency/listings/latest");

    const renderedRows = data.map((data) => <TableBodyRow data={data} />);

    let content;
    if (error) {
        content = <div>Something went wrong! {error.message}</div>;
    } else {
        <TableMUI>
            <TableHead>
                <TableRow>
                    <TD>Name</TD>
                    <TD>Price</TD>
                    <TD>Change</TD>
                </TableRow>
            </TableHead>
            <TableBody>{renderedRows}</TableBody>
        </TableMUI>;
    }

    return content;
}

export default Table;
