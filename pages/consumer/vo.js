import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ContainedList, ContainedListItem, Button, Theme } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";


function WithInteractiveItemsAndActions() {
  const { user, loadingUser } = useSelector((state) => state.userAuth);
  const onClick = action('onClick (ContainedListItem)');
  const itemAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} />;
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [price, setPrice] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true);

  console.log(cartItems);

  const router = useRouter();

  const goToHome = () => {
    router.push('/consumer');
  }

  const fetchData = async () => {
    try {
      const userId = user.id; // Replace with the actual user ID
      const response = await fetch("http://127.0.0.1:5000/list_order_customer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userId }),
      });
  
      if (!response.ok) {
        throw new Error(`Network request failed with status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result); 
      setCartItems(result);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
    
   useEffect(() => {
     fetchData();
   }, []);
   
  const renderCartItems = () => {
    
    return cartItems.map((item, index) => (
      
      <ContainedListItem key={item.id}  action={itemAction}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1%", }}>
          <span>{item.food_name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
             <span style={{ margin: "0 0.5rem" }}> Quantity: {item.quantity}</span>
             <span style={{ margin: "0 0.5rem" }}>Price : {item.price}</span>          
          </div>
        </div>
      </ContainedListItem>
    ));
    
  };

  const { dishId, dishName, dishPrice } = router.query;

  

  return (
    <div>
      <Theme theme="white">
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "80%",
        margin: "auto",
        padding: "90px",
      }}
    >
      <Theme theme="g10">
      <ContainedList label="Your Cart" kind="on-page" action={''} >
      
          {renderCartItems()}
         {/* { fetchData() } */}
     
       </ContainedList>
       
      </Theme>
      <Button onClick={goToHome} style={{ backgroundColor: "#640aa8", marginTop: "2%", paddingLeft: "5%" }}>Home</Button>
      
    </div>
      </Theme>
    </div>
    
  );
}

export default WithInteractiveItemsAndActions;