import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import React, { useEffect, useState } from "react";

const headers = [
  {
    key: "orderId",
    header: "OrderId",
  },
  {
    key: "foodName",
    header: "Dish Name",
  },
];

function orders() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/list_order_fsp");

      if (!response.ok) {
        throw new Error("Network request failed");
      }

      const result = await response.json();

      console.log(result);
      const displayOrders = result.map((item) => ({
        orderId: item.orderid,
        foodName: item.food_name,
      }));
      console.log(displayOrders);
      setData(displayOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "80%",
        margin: "auto",
        padding: "100px",
      }}
    >
      <DataTable
        rows={data}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getExpandHeaderProps,
          getRowProps,
          getExpandedRowProps,
          getToolbarProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            description=""
            {...getTableContainerProps()}
            style={{ marginTop: "20px" }}
          >
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
                {rows?.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row?.cells?.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </div>
  );
}

export default orders;
