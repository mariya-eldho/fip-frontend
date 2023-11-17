import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContainedList, ContainedListItem, Button, Theme } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";

import { action } from "@storybook/addon-actions";
import { useSelector, useDispatch } from 'react-redux';




function WithInteractiveItemsAndActions() {
  
  console.log("Cartitems");

  const dispatch = useDispatch();
  //const cartItems = useSelector((state) => state.cartItems);
  const onClick = action('onClick (ContainedListItem)');
  //const { dishId, dishName, dishPrice } = router.query;
  const itemAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} />;

  // Create an array of quantities, one for each item
  const initialQuantities = [1];
  const [quantities, setQuantities] = useState([initialQuantities]);
  const [cartItems, setCartItems] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true)
  const [allItemsAdded, setAllItemsAdded] = useState(false);
  
  console.log(cartItems);

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    if (quantities[index] > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const removeCartItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);

    const newQuantities = [...quantities];
    newQuantities.splice(index, 1);
    setQuantities(newQuantities);
  };

  const router = useRouter();

  //const history = useNavigate();

  useEffect(() => {
    // Extract dish details from the router query
    setCartItems((prevItems) => [...prevItems, cartItems]);
    const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
    
    console.log("hi");
    console.log(cartItemsQuery);
   

    // Parse cartItems from the query string
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

    console.log("hiii");
    console.log(parsedCartItems);
    
    // Update the component state with the new cart items
    //setCartItems(parsedCartItems);
    if(queryParamNotAdded) {
      setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
      setQueryParamNotAdded(true);
    }
    

    console.log("Hiiiiiii");
    console.log(setCartItems(parsedCartItems));

    // Update the quantities state based on the length of cart items
    setQuantities(new Array(parsedCartItems.length).fill(1));
    const s = localStorage.setItem("cart",cartItemsQuery);
    // Handle other details like dishId, dishName, dishPrice as needed
    console.log('Dish Details:', cartItemsQuery);
   
  
      // Navigate to the cart page
      
    
  }, [router.query]);


  const handleConfirmOrder = () => {
   // setCartItems((prevItems) => [...prevItems, cartItems]);
    const isCartEmpty = cartItems.length === 0;
    if (isCartEmpty) {
      alert('Your cart is empty. Please add items to your cart before confirming the order.');
      return;
    }
    else{
      //router.push('/consumer/order-confirm');
      alert('Your order placed successfully !');
      router.push({
        pathname: "/consumer/vo",
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities: quantities,
          price : quantities * {dishPrice},
        },
      });
     
    }
      

  };

  const handleGoBackToOrderPage = () => {
   // localStorage.getItem('cartItems');
   localStorage.setItem('cartItems', JSON.stringify(cartItems))
    //localStorage.getItem('s');
    router.push({
      pathname: "/consumer",
      query: {
        cartItems: JSON.stringify(cartItems),
        quantities: quantities,
      },
    });
    console.log(cartItems)
 
  };

  
  

  const renderCartItems = () => {
    return cartItems.map((item, index) => (
      <ContainedListItem key={item.id} action={itemAction}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "3%", }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
  
            {quantities[index] > 1 && <Button onClick={() => decreaseQuantity(index)} style={decreaseButtonStyle}>-</Button>}
            <Button onClick={() => increaseQuantity(index)} style={increaseButtonStyle}>+</Button>
            <span style={{ margin: "0 0.5rem", fontWeight: "bold" }}>Quantity: {quantities[index]}</span>
  
            <Button onClick={() => removeCartItem(index)} style={removeButtonStyle}>Remove</Button>
          </div>
        </div>
      </ContainedListItem>
    ));
  };
  
  const baseButtonStyle = {
    cursor: "pointer",
    padding: "12px",
    borderRadius: "1px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };
  
  const decreaseButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#ffffff",
    color: "black",
  };
  
  const increaseButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#ffffff",
    color: "black",
  };
  
  const removeButtonStyle = {
    cursor: "pointer",
    padding: "12px",
    borderRadius: "4px",
    backgroundColor: "#640aa8",
    color: "white",
  };

  const ButtonStyle = {
    cursor: "pointer",
    padding: "12px",
    borderRadius: "4px",
    marginLeft : "3%",
    marginRight: "5%",
    backgroundColor: "#640aa8",
    color: "white",
  };
  
  // ... (rest of your component code)
  
  
  

  const { dishId, dishName, dishPrice } = router.query;

  return (
    <div>
      <Theme theme="white">
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "80%",
        margin: "auto",
        padding: "90px",
      }}
    >
      <Theme theme="g10">
      <ContainedList label="Yours Orders" kind="on-page" action={''}>
        {renderCartItems()}
      </ContainedList>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3%"}}>
        <Button onClick={handleGoBackToOrderPage} style={ButtonStyle}>Go Back to Order Page</Button>
        <Button onClick={handleConfirmOrder} style={ButtonStyle}>Confirm Order  </Button>
     

      </div>
      </Theme>
      </div>
      </Theme>
    </div>
    


  );
}

export default WithInteractiveItemsAndActions;
