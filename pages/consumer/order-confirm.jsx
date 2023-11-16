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
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true);

  useEffect(() => {
    const { cartItems: cartItemsQuery, quantities, price } = router.query;
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

    if (queryParamNotAdded) {
      setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
      setQueryParamNotAdded(false); // Set to false once items are added to avoid re-adding them
    }

    setQuantities(quantities);
    setPrice(price);

    // Save cartItems to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItemsQuery));

    if (allItemsAdded) {
      // Navigate to the cart page
      router.push({
        pathname: '/consumer/vo',
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities,
          price: quantities * price,
        },
      });
    }

    // Redirect after a delay
    const timeoutId = setTimeout(() => {
      console.log('Redirecting...');
      setIsRedirecting(true);

      router.push({
        pathname: '/consumer/vo',
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities,
          price: quantities * price,
        },
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