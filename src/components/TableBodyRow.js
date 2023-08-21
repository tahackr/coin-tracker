import React from "react";
import { TableRow, TableCell } from "@mui/material";

function TableBodyRow({ coin }) {
  const { name, price, change } = coin;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{change}</TableCell>
    </TableRow>
  );
}

export default TableBodyRow;
