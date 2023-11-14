import React, { useState, useEffect } from "react";
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
} from "@carbon/react";

function BatchExpansion() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [allItemsAdded, setAllItemsAdded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const addToCart = (dish) => {
    const { id, name, price } = dish;
    const newDish = { id, name, price };

    // Check if the item has already been added to the cart
    if (!addedToCart[id]) {
      setCartItems((prevItems) => [...prevItems, newDish]);
      setAddedToCart((prevAdded) => ({ ...prevAdded, [id]: true }));

      // Set the success message
      setSuccessMessage(`${name} added to cart!`);

      // Clear the message after a short delay
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  };
  

  useEffect(() => {
    if (allItemsAdded) {
      // Navigate to the cart page
      router.push({
        pathname: "/consumer/CP",
        query: {
          cartItems: JSON.stringify(cartItems),
        },
      });
    }
  }, [allItemsAdded, router, cartItems]);

  const handleGoToCart = () => {
    // Set the allItemsAdded state to true
    setAllItemsAdded(true);
  };

  const rows = [
    {
      id: "a",
      name: "Thali",
      status: (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "#640aa8" }}
            onClick={() => addToCart(rows[0])}
            disabled={addedToCart["a"]}
          >
            {addedToCart["a"] ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      ),
      price: "170",
    },
    {
      id: "b",
      name: "Chicken Biryani",
      status: (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "#640aa8" }}
            onClick={() => addToCart(rows[1])}
            disabled={addedToCart["b"]}
          >
            {addedToCart["b"] ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      ),
      price: "170",
    },
    {
      id: "c",
      name: "Veg Meals",
      status: (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "#640aa8" }}
            onClick={() => addToCart(rows[2])}
            disabled={addedToCart["c"]}
          >
            {addedToCart["c"] ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      ),
      price: "170",
    },
    {
      id: "d",
      name: "Veg Biryani",
      status: (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "#640aa8" }}
            onClick={() => addToCart(rows[3])}
            disabled={addedToCart["d"]}
          >
            {addedToCart["d"] ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      ),
      price: "170",
    },
    {
      id: "e",
      name: "Fish",
      status: (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "#640aa8" }}
            onClick={() => addToCart(rows[4])}
            disabled={addedToCart["e"]}
          >
            {addedToCart["e"] ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      ),
      price: "170",
    },
    {
      id: "f",
      name: "Noodles",
      status: (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            style={{ backgroundColor: "#640aa8" }}
            onClick={() => addToCart(rows[5])}
            disabled={addedToCart["f"]}
          >
            {addedToCart["f"] ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      ),
      price: "170",
    },
  ];

  const headers = [
    {
      key: "name",
      header: "Dish",
    },
    {
      key: "price",
      header: "Price",
    },
    {
      key: "status",
      header: <div style={{ textAlign: "center" }}>Orders Expected</div>,
    },
  ];

  

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "80%",
      margin: "auto",
      padding: "90px",
    }}>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <DataTable rows={rows} headers={headers} render={({ rows, headers, getHeaderProps, getExpandHeaderProps, getRowProps, getExpandedRowProps, getTableProps, getTableContainerProps }) => (
        <div style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>
          <Theme theme="g10" >
            <TableContainer title="Order your Favourite Food" description="" {...getTableContainerProps()} >
              <Table {...getTableProps()} aria-label="sample table"  >
                <TableHead>
                  <TableRow >
                    <TableExpandHeader  enableToggle={true} {...getExpandHeaderProps()} />
                    {headers.map((header, i) => <TableHeader key={i} {...getHeaderProps({
                      header
                    })}>
                      {header.header}
                    </TableHeader>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => <React.Fragment key={row.id}>
                    <TableExpandRow {...getRowProps({
                      row
                    })} >
                      {row.cells.map(cell => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                    </TableExpandRow>
                    <TableExpandedRow colSpan={headers.length + 1} className="demo-expanded-td" {...getExpandedRowProps({
                      row
                    })}>
                      <h6>About the dish</h6>
                      <div>Lorem Ipsum is simply dummy text </div> <br></br>
                    </TableExpandedRow>
                  </React.Fragment>)}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{
              width: '800px',
              padding: '1rem',
            }}>
              <Button onClick={handleGoToCart}>Go to Cart</Button>
            </div>
          </Theme>
        </div>
      )} />
  </div>
  );
          } 

export default BatchExpansion;
