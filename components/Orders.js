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
import { async } from "@firebase/util";

function BatchExpansion() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [allItemsAdded, setAllItemsAdded] = useState(false);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true)
  const [quantities, setQuantities] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});


  const addToCart = (dish) => {
    console.log('Adding to Cart:', dish);

    // Extract necessary information from dish
    const { id, name, price } = dish;

    // Create a new object with extracted information
    const newDish = { id, name, price };
    const newQ = {quantities};
    if (!addedToCart[id]) {
      setCartItems((prevItems) => [...prevItems, newDish]);
      setAddedToCart((prevAdded) => ({ ...prevAdded, [id]: true }));
    }
  };

  

  useEffect(() => {
    // Save cartItems to local storage when it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Extract dish details from the router query
    const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
    console.log("hi");
    console.log(cartItemsQuery);
    // Parse cartItems from the query string
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];
    console.log("parsedCartItems")
    console.log(parsedCartItems)
    if(queryParamNotAdded) {
    setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
    setQueryParamNotAdded(true);
    }
    // Check if all items have been added
    if (allItemsAdded) {
      // Navigate to the cart page
      router.push({
        pathname: "/consumer/CP",
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities: quantities,
        },
      });
    }
  }, [allItemsAdded, router]);

  const handleGoToCart = () => {
    // Set the allItemsAdded state to true
    setAllItemsAdded(true);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        margin: "auto",
        padding: "90px",
      }}
    >
      
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
          
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
                  paddingTop: "1rem",
                }}
              >
                <Button onClick={handleGoToCart} style={{ backgroundColor: "#640aa8", }}>Go to Cart</Button>
              </div>

          </div>
        )}
      />
    </div>
  );
}

export default BatchExpansion;


