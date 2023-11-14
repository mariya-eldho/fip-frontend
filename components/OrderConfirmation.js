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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Redirecting...');
      setIsRedirecting(true);
      router.push("/consumer");
    }, 2000);
  
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <div style={centeredStyle}>
      <CheckmarkOutline size={48} />
      {isRedirecting ? (
        <p>Redirecting...</p>
      ) : (
        <p>Your order has been placed successfully!</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
