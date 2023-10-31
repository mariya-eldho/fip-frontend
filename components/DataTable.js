import React from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

const rows = [
  {
    id: "a",
    name: "Thali",
    status: "Disabled",
  },
  {
    id: "b",
    name: "Chicken Biryani",
    status: "Starting",
  },
  {
    id: "c",
    name: "Veg Meals",
    status: "Active",
  },
  {
    id: "d",
    name: "Veg Biryani",
    status: "Active",
  },
  {
    id: "e",
    name: "Fish Meals",
    status: "Active",
  },
  {
    id: "f",
    name: "Noodles",
    status: "Active",
  },
];

const headers = [
  {
    key: "name",
    header: "Dish",
  },
  {
    key: "status",
    header: "Orders Expected",
  },
];

function Datatable() {
  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
}

export default Datatable;
