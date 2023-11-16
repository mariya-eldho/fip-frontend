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


  const addToCart = (dish) => {
    console.log('Adding to Cart:', dish);

    // Extract necessary information from dish
    const { id, name, price } = dish;

    // Create a new object with extracted information
    const newDish = { id, name, price };

    // Update the local state with the new item
    setCartItems((prevItems) => [...prevItems, newDish]);
    setQuantities(quantities);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/list_food");
          
          
       
      
        if (!response.ok) {
          throw new Error("Network request failed");
        }
        const result = await response.json();
        const ids = result.map(item => item.id);
        console.log(ids);
        console.log(result);
      }
      catch (e) {
        console.log(e);
      }

    }

    fetchData();
  });

  // Use useEffect to navigate after the state has been updated
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
      status: <div style={{ padding: "1rem", textAlign: "center", }}> <Button style={{ backgroundColor: "#640aa8", }} onClick={() => addToCart(rows[0])}>Add to Cart</Button> </div>,
      price: "170",
    },
    {
      id: "b",
      name: "Chicken Biryani",
      status: <div style={{ padding: "1rem", textAlign: "center", }}> <Button style={{ backgroundColor: "#640aa8", }} onClick={() => addToCart(rows[1])}>Add to Cart</Button> </div>,
      price: "170",
    },
    {
      id: "c",
      name: "Veg Meals",
      status: <div style={{ padding: "1rem", textAlign: "center", }}> <Button style={{ backgroundColor: "#640aa8", }} onClick={() => addToCart(rows[2])}>Add to Cart</Button> </div>,
      price: "170",
    },
    {
      id: "d",
      name: "Veg Biryani",
      status: <div style={{ padding: "1rem", textAlign: "center", }}> <Button style={{ backgroundColor: "#640aa8", }} onClick={() => addToCart(rows[3])}>Add to Cart</Button> </div>,
      price: "170",
    },
    {
      id: "e",
      name: "Fish Meals",
      status: <div style={{ padding: "1rem", textAlign: "center", }}> <Button style={{ backgroundColor: "#640aa8", }} onClick={() => addToCart(rows[4])}>Add to Cart</Button> </div>,
      price: "170",
    },
    {
      id: "f",
      name: "Noodles",
      status: <div style={{ padding: "1rem", textAlign: "center", }}> <Button style={{ backgroundColor: "#640aa8", }} onClick={() => addToCart(rows[5])}>Add to Cart</Button> </div> ,
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


