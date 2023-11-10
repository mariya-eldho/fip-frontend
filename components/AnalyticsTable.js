import React from "react";
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
} from "@carbon/react";
import Link from "next/link";

function AnalyticsTable() {
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

  const router = useRouter();

  const addToCart = (dish) => {
    console.log("Adding to Cart:", dish);
    router.push({
      pathname: "/consumer/yourcart",
      query: {
        dishId: dish.id,
        dishName: dish.name,
        dishPrice: dish.expectedOrders,
      },
    });
  };
  return (
    <DataTable
      rows={rows}
      headers={headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getExpandHeaderProps,
        getRowProps,
        getExpandedRowProps,
        getTableProps,
        getTableContainerProps,
      }) => (
        <div
          style={{
            //display: "flex",
            //display: "grid",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <Theme theme="g10">
            <TableContainer
              title="Order your Favourite Food"
              description=""
              {...getTableContainerProps()}
            >
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    <TableExpandHeader
                      enableToggle={true}
                      {...getExpandHeaderProps()}
                    />
                    {headers.map((header, i) => (
                      <TableHeader
                        key={i}
                        {...getHeaderProps({
                          header,
                        })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableExpandRow
                        {...getRowProps({
                          row,
                        })}
                      >
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableExpandRow>
                      <TableExpandedRow
                        colSpan={headers.length + 1}
                        className="demo-expanded-td"
                        {...getExpandedRowProps({
                          row,
                        })}
                      >
                        <h6>About the dish</h6>
                        <div>Lorem Ipsum is simply dummy text </div> <br></br>
                      </TableExpandedRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                width: "800px",
                padding: "1rem",
              }}
            ></div>
          </Theme>
        </div>
      )}
    />
  );
}

export default AnalyticsTable;
