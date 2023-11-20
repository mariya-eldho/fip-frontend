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

const headers = [
  {
    key: "foodName",
    header: "Dish",
  },
  {
    key: "foodPrice",
    header: "Price",
  },
  {
    key: "orderFood",
    header: <div style={{ textAlign: "center" }}>Orders Expected</div>,
  },
];

function BatchExpansion() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [allItemsAdded, setAllItemsAdded] = useState(false);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true)
  const [quantities, setQuantities] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [data, setData] = useState([]);
  const [foodName, setFoodName] = useState(" ");
  const [foodPrice, setFoodPrice] = useState(" ");
  const [id, setId] = useState(" ");


  const addToCart = (id, foodName, foodPrice) => {
    console.log(`Addinggg to cart: ${foodName} - ${foodPrice}`);

    const newDish = {id: id, name: foodName, price: foodPrice };
  
    if (!addedToCart[id]) {
      setCartItems((prevItems) => [...prevItems, newDish]);
      setAddedToCart((prevAdded) => ({ ...prevAdded, [id]: true }));
    }
  };
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/list_food");
  
        if (!response.ok) {
          throw new Error("Network request failed");
        }
  
        const result = await response.json();
  
        const displayOrders = result.map((item, index) => ({
          id: index,
          foodName: item.name,
          foodPrice: item.price,
          orderFood: (
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <Button
                style={{ backgroundColor: "#640aa8" }}
                onClick={() => addToCart(id, item.name, item.price)}
                disabled={addedToCart[id]}
              >
                {addedToCart[id] ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>
          ),
        }));
        
        setData(displayOrders);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, []);
  
   
  useEffect(() => {
    const { cartItems: cartItemsQuery } = router.query;
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];
    if (queryParamNotAdded) {
      setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
      setQueryParamNotAdded(true);
    }
  
    if (allItemsAdded) {
      router.push({
        pathname: "/consumer/CP",
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities: quantities,
          foodName: foodName,
          foodPrice: foodPrice,
        },
      });
    }
  }, [allItemsAdded, router]);
  
  

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

 

  const handleGoToCart = () => {

    setAllItemsAdded(true);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };





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
        rows={data}
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

