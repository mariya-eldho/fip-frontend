import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContainedList, ContainedListItem, Button, Theme, TextInput } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";

import { action } from "@storybook/addon-actions";
import { useSelector, useDispatch } from 'react-redux';
import shortid from "shortid";




function WithInteractiveItemsAndActions() {

  const { user, loadingUser } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const onClick = action('onClick (ContainedListItem)');
  const itemAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} />;
  const initialQuantities = [1];
  const [quantities, setQuantities] = useState([initialQuantities]);
  const [cartItems, setCartItems] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true)
  const [allItemsAdded, setAllItemsAdded] = useState(false);
  const [foodName, setFoodName] = useState(" ");
  const [foodPrice, setFoodPrice] = useState("");
  const [id, setId] = useState(" ");
  const [loading, setLoading] = useState(false);

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



  useEffect(() => {
    setCartItems((prevItems) => [...prevItems, cartItems]);
    const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

    console.log("hiii");
    console.log(parsedCartItems);
    

    if(queryParamNotAdded) {
      setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
      setQueryParamNotAdded(true);
    }
    

    console.log("Hiiiiiii");
    console.log(setCartItems(parsedCartItems));

    setQuantities(new Array(parsedCartItems.length).fill(1));
    const s = localStorage.setItem("cart",cartItemsQuery);

    console.log('Dish Details:', cartItemsQuery);
    
    
  }, [router.query]);



  const handleGoBackToOrderPage = () => {

   localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
          <span >{item.name}</span>
          <span>{ [quantities[index]*item.price] }</span>
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

  const handleConfirmOrder = async () => {
    setAllItemsAdded(true);
    const isCartEmpty = cartItems.length === 0;
    if (isCartEmpty) {
      alert('Your cart is empty. Please add items to your cart before confirming the order.');
      return;
    }
    try {      
      const orderData = cartItems.map((item, index) => ({
        date: "2023-11-20",
        food_name: item.name,
        quantity: quantities[index],
        price: [item.price] * [quantities[index]]  ,
        age: "35",
        foodid: index,
        userid: user.id ,
        status : "false",
        orderid: shortid.generate(),
      }));
  
      const response = await fetch("http://127.0.0.1:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error(`Network request failed with status: ${response.status}`);
      }

      console.log("Order successfully submitted!");
      router.push('/consumer/vo');
  
    } catch (error) {
      console.error("Error during fetch:", error);
    }
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
