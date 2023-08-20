//import axios from "axios";
import * as React from "react";
import TableBodyRow from "./TableBodyRow";
import useFetch from "../hooks/use-fetch";

function Table() {
    //todos
    //const renderedRows = data.map((data) => <TableBodyRow data={data} />);
    // Send response.data here
    // data maplerken her data objesinde quote.USD ye bak
    // burda .price .percent_change_1h .percent_change_24h .percent_change_7d

    const data = useFetch("v1/cryptocurrency/listings/latest");

    return (
        <table className="block table-fixed p-16">
            <thead>
                <tr className="border-b border-t">
                    <th className="text-left">Coin name</th>
                    <th>Salih</th>
                    <th>Çakır</th>
                    <th>Çakır</th>
                    <th>Çakır</th>
                    <th>Çakır</th>
                    <th>Çakısafasfasar</th>
                </tr>
            </thead>
            <tbody>
                {/* {renderedRows} */}
                <TableBodyRow />
                <TableBodyRow />
                <TableBodyRow />
                <TableBodyRow />
                <TableBodyRow />
                <TableBodyRow />
            </tbody>
        </table>
    );
}

export default Table;
