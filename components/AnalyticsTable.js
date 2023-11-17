import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Theme,
  PaginationNav,
  TableToolbar,
  TableToolbarContent,
  TableToolbar,
  TableToolbarContent,
} from "@carbon/react";
import Link from "next/link";

const rows = [
  {
    id: "a",
    name: "Thali",
    status: (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
        <Link href={"/service-provider/Thali"}>
          <Button style={{ backgroundColor: "#0f62fe" }}>
            Go To Analytics
          </Button>{" "}
        </Link>
      </div>
    ),
    expectedOrders: "170",
  },
  {
    id: "b",
    name: "Chicken Biryani",
    status: (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
        <Link href={"/service-provider/Chicken-Biryani"}>
          <Button style={{ backgroundColor: "#0f62fe" }}>
            Go To Analytics
          </Button>{" "}
        </Link>
      </div>
    ),
    expectedOrders: "170",
  },
  {
    id: "c",
    name: "Veg Meals",
    status: (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
        <Link href={"/service-provider/Veg-Meals"}>
          <Button style={{ backgroundColor: "#0f62fe" }}>
            Go To Analytics
          </Button>{" "}
        </Link>
      </div>
    ),
    expectedOrders: "170",
  },
  {
    id: "d",
    name: "Veg Biryani",
    status: (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
        <Link href={"/service-provider/Veg-Biryani"}>
          <Button style={{ backgroundColor: "#0f62fe" }}>
            Go To Analytics
          </Button>{" "}
        </Link>
      </div>
    ),
    expectedOrders: "170",
  },
  {
    id: "e",
    name: "Fish Meals",
    status: (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
        <Link href={"/service-provider/Fish-Meals"}>
          <Button style={{ backgroundColor: "#0f62fe" }}>
            Go To Analytics
          </Button>{" "}
        </Link>
      </div>
    ),
    expectedOrders: "170",
  },
  {
    id: "f",
    name: "Noodles",
    status: (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        {" "}
        <Link href={"/service-provider/Noodles"}>
          <Button style={{ backgroundColor: "#0f62fe" }}>
            Go To Analytics
          </Button>{" "}
        </Link>
      </div>
    ),
    expectedOrders: "170",
  },
];

const headers = [
  {
    key: "name",
    header: "Dish",
  },
  {
    key: "expectedOrders",
    header: "Expected Orders",
  },
  {
    key: "status",
    header: <div style={{ textAlign: "center" }}>Analytics</div>,
  },
];
const headers = [
  {
    key: "name",
    header: "Dish",
  },
  {
    key: "expectedOrders",
    header: "Expected Orders",
  },
  {
    key: "status",
    header: <div style={{ textAlign: "center" }}>Analytics</div>,
  },
];

function AnalyticsTable({ date }) {
function AnalyticsTable({ date }) {
  const router = useRouter();
  const [data, setData] = useState(rows);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/expected_order", {
        method: "POST", // You can use other HTTP methods like GET, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json", // Specify the content type if you're sending JSON data
          // Additional headers can be added here
        },
        body: JSON.stringify({
          date: date ? `[${date}]` : `[${new Date()}]`,
          // Add any other data you want to include in the request body
        }),
      });

      if (!response.ok) {
        throw new Error("Network request failed");
      }

      const result = await response.json();
      console.log(result);
      const mappedArray = Object.keys(result).map((key, index) => {
        const value = result[key];
        // You can perform any transformations or operations here
        // return `${key}: ${value}`;
        return {
          id: index,
          name: key,
          status: (
            <div style={{ padding: "1rem", textAlign: "center" }}>
              {" "}
              <Link href={`/service-provider/${key}`}>
                <Button style={{ backgroundColor: "#0f62fe" }}>
                  Go To Analytics
                </Button>{" "}
              </Link>
            </div>
          ),
          expectedOrders: Math.floor(value),
        };
      });
      console.log(mappedArray);
      setData(mappedArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const [data, setData] = useState(rows);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/expected_order", {
        method: "POST", // You can use other HTTP methods like GET, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json", // Specify the content type if you're sending JSON data
          // Additional headers can be added here
        },
        body: JSON.stringify({
          date: date ? `[${date}]` : `[${new Date()}]`,
          // Add any other data you want to include in the request body
        }),
      });

      if (!response.ok) {
        throw new Error("Network request failed");
      }

      const result = await response.json();
      console.log(result);
      const mappedArray = Object.keys(result).map((key, index) => {
        const value = result[key];
        // You can perform any transformations or operations here
        // return `${key}: ${value}`;
        return {
          id: index,
          name: key,
          status: (
            <div style={{ padding: "1rem", textAlign: "center" }}>
              {" "}
              <Link href={`/service-provider/${key}`}>
                <Button style={{ backgroundColor: "#0f62fe" }}>
                  Go To Analytics
                </Button>{" "}
              </Link>
            </div>
          ),
          expectedOrders: Math.floor(value),
        };
      });
      console.log(mappedArray);
      setData(mappedArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <DataTable
      rows={data}
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
        getToolbarProps,
        getTableProps,
        getTableContainerProps,
      }) => (
        <TableContainer
          description=""
          {...getTableContainerProps()}
          style={{ marginTop: "20px" }}
        >
          <TableToolbar {...getToolbarProps()}>
            <TableToolbarContent>
              <Button
                onClick={() => {
                  router.push("/service-provider/add-item");
                }}
                kind="primary"
              >
                Add new
              </Button>
            </TableToolbarContent>
          </TableToolbar>
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
        </TableContainer>
        <TableContainer
          description=""
          {...getTableContainerProps()}
          style={{ marginTop: "20px" }}
        >
          <TableToolbar {...getToolbarProps()}>
            <TableToolbarContent>
              <Button
                onClick={() => {
                  router.push("/service-provider/add-item");
                }}
                kind="primary"
              >
                + Add new Dish
              </Button>
            </TableToolbarContent>
          </TableToolbar>
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
        </TableContainer>
      )}
    />
  );
}

export default AnalyticsTable;
