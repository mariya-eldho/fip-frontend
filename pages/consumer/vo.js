import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContainedList, ContainedListItem, Button, Theme } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";


function WithInteractiveItemsAndActions() {

  const onClick = action('onClick (ContainedListItem)');
  const itemAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} />;
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [price, setPrice] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true);

  console.log(cartItems);

  const router = useRouter();


  useEffect(() => {
    const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
    const { quantities } = router.query;
    const { price } = router.query;
    console.log("hi");
    console.log(cartItemsQuery);
   

    // Parse cartItems from the query string
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

    console.log("hiii");
    console.log(parsedCartItems);

    if(queryParamNotAdded) {
        setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
        setQueryParamNotAdded(true);
    }

    setQuantities(quantities);
    setPrice(price);
    console.log("Hiiiiiii");
    console.log(setCartItems(parsedCartItems));

    
    
    // Handle other details like dishId, dishName, dishPrice as needed
    console.log('Dish Details:', cartItemsQuery);
    const s = localStorage.setItem("cart",cartItemsQuery);
 }, [router.query]);


  const goToHome = () => {
    router.push('/consumer');
  }

  const renderCartItems = () => {
    
    return cartItems.map((item, index) => (
      
      <ContainedListItem key={item.id}  action={itemAction}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1%", }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
             <span style={{ margin: "0 0.5rem" }}> Quantity: {quantities[index]}</span>
             <span style={{ margin: "0 0.5rem" }}>Price : { [quantities[index]*item.price] }</span>          
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
     
       </ContainedList>
       
      </Theme>
      <Button onClick={goToHome} style={{ backgroundColor: "#640aa8", marginTop: "2%", paddingLeft: "5%" }}>Home</Button>
      
    </div>
      </Theme>
    </div>
    
  );
}

export default WithInteractiveItemsAndActions;