import React from "react";
import {
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import TableBodyRow from "./TableBodyRow";
import useFetch from "../hooks/useFetch";

function Table() {
  const { data: coins, isFetching, error } = useFetch("/src/data/coins.json");

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isFetching) {
    // Replace this with your desired loading state or a skeleton
    return <div>Loading...</div>;
  }

  return (
    <MUITable className="block p-2">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Change</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {coins?.map((coin, index) => (
          <TableBodyRow key={`${coin.name}${index}`} coin={coin} />
        ))}
      </TableBody>
    </MUITable>
  );
}

export default Table;
