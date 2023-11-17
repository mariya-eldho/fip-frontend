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
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [price, setPrice] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true);

  useEffect(() => {
    // Redirect after a delay
    const timeoutId = setTimeout(() => {
      console.log('Redirecting...');
      setIsRedirecting(true);

      // Pass cartItems, quantities, and price as query parameters to vo page
      router.push({
        pathname: "/consumer/vo",
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities: JSON.stringify(quantities),
          price: price,
        },
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [router.query]);

  // Other code...

  return (
    <div style={centeredStyle}>
      <CheckmarkOutline size={48} />
      {isRedirecting ? (<p>Redirecting...</p>) : (<p>Your order has been placed successfully!</p>)}
    </div>
  );
};

export default OrderConfirmation;






















