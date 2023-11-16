import React, { useState, useEffect } from "react";
import { CheckmarkOutline } from "@carbon/icons-react";
import { useRouter } from "next/router";

const centeredStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

const OrderConfirmation = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [allItemsAdded, setAllItemsAdded] = useState(false);
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [price, setPrice] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true)
  
  //const [queryParamNotAdded, setQueryParamNotAdded] = useState(true)

  useEffect(() => {

    const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
    
    const { quantities } = router.query;
    const { price } = router.query;
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

    console.log("hiii");
    console.log(parsedCartItems);
    

    // Update the component state with the new cart items
    //setCartItems(parsedCartItems);
    if(queryParamNotAdded) {
      setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
      setQueryParamNotAdded(true);
    }
    
    setQuantities(quantities);
    setPrice(price);

    const s = localStorage.setItem("cart",cartItemsQuery);
    // Set up the query parameters
    // const queryParams = {
    //   cartItems: JSON.stringify(cartItems),
    //   quantities: quantities,
    //   price: quantities * price,
    // };
    if (allItemsAdded) {
      // Navigate to the cart page
      router.push({
        pathname: "/consumer/vo",
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities: quantities,
          price: quantities * price,
        },
      });
    }
     
    
    // Redirect after a delay
      const timeoutId = setTimeout(() => {
        console.log('Redirecting...');
        setIsRedirecting(true);

        
        router.push({
          pathname: "/consumer/vo",
          query: { cartItems: JSON.stringify(cartItems),
                  quantities: quantities,
                  price: quantities * price, }
        });
        setAllItemsAdded(true);
      }, 2000);
   
    return () => clearTimeout(timeoutId);
  }, [router.query]);

  const { dishId, dishName, dishPrice } = router.query;

  return (
    <div style={centeredStyle}>
      <CheckmarkOutline size={48} />
      {isRedirecting ? (<p>Redirecting...</p>) : (<p>Your order has been placed successfully!</p>)}
    </div>
  );
};

export default OrderConfirmation;






















