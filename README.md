
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
    const { dishId, dishName, dishPrice,quantities, cartItems: cartItemsQuery } = router.query;
    
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

    const quantitiesFromLocalStorage = JSON.parse(localStorage.getItem('quantities'));
    setQuantities(quantitiesFromLocalStorage);
    // Update the quantities state based on the length of cart items
    //setQuantities(new Array(parsedCartItems.length).fill(1));
    const s = localStorage.setItem("cart",cartItemsQuery);
    const v = localStorage.setItem("quantities",cartItemsQuery);

    // Handle other details like dishId, dishName, dishPrice as needed
    console.log('Dish Details:', cartItemsQuery);
   
  }, [router.query]);


  const handleConfirmOrder = () => {
   // setCartItems((prevItems) => [...prevItems, cartItems]);
    const isCartEmpty = cartItems.length === 0;
    if (isCartEmpty) {
      alert('Your cart is empty. Please add items to your cart before confirming the order.');
      return;
    }
  
      router.push({
        pathname: "/consumer/vo",
        query: {
          cartItems: JSON.stringify(cartItems),
          quantities: quantities,
          price : quantities * {dishPrice},
        },
      });

  };

  const handleGoBackToOrderPage = () => {
   // localStorage.getItem('cartItems');
   localStorage.setItem('cartItems', JSON.stringify(cartItems))
   localStorage.setItem('quantities', JSON.stringify(quantities));

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>

            {quantities[index] > 1 && <Button onClick={() => decreaseQuantity(index)}>-</Button>}
            <Button onClick={() => increaseQuantity(index)}>+</Button>
            <span style={{ margin: "0 0.5rem" }}>Quantity: {quantities[index]}</span>
            
            <Button onClick={() => removeCartItem(index)}>Remove</Button>
          </div>
        </div>
      </ContainedListItem>
    ));
  };
  
  
  

  const { dishId, dishName, dishPrice } = router.query;

  return (
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
      <ContainedList label="Cart Items" kind="on-page" action={''}>
        {renderCartItems()}
      </ContainedList>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleGoBackToOrderPage}>Go Back to Order Page</Button>
        <Button onClick={handleConfirmOrder}>Confirm Order  </Button>
     

      </div>
    </div>
  );
}

export default WithInteractiveItemsAndActions;





import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContainedList, ContainedListItem, Button } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";
import { useSelector, useDispatch } from 'react-redux';

function WithInteractiveItemsAndActions() {
  const dispatch = useDispatch();
  const onClick = action('onClick (ContainedListItem)');
  const itemAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} />;

  const [quantities, setQuantities] = useState([1]);
  const [cartItems, setCartItems] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true);

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

  useEffect(() => {
    const { cartItems: cartItemsQuery, quantities: quantitiesQuery } = router.query;

    console.log("hi");
    console.log(cartItemsQuery);

    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];
    const parsedQuantities = quantitiesQuery ? JSON.parse(quantitiesQuery) : [1];

    console.log("hiii");
    console.log(parsedCartItems);

    if (queryParamNotAdded) {
      setCartItems((prevItems) => [...prevItems, ...parsedCartItems]);
      setQuantities(parsedQuantities);
      setQueryParamNotAdded(false);
    }

    const s = localStorage.setItem("cart", JSON.stringify(parsedCartItems));
    const v = localStorage.setItem("quantities", JSON.stringify(parsedQuantities));

    console.log('Dish Details:', cartItemsQuery);
  }, [router.query]);

  const handleConfirmOrder = () => {
    const isCartEmpty = cartItems.length === 0;
    if (isCartEmpty) {
      alert('Your cart is empty. Please add items to your cart before confirming the order.');
      return;
    }
    const totalPrice = cartItems.reduce((total, item, index) => {
      const itemPrice = Number(item.price) || 0; // Ensure item price is a number
      return total + quantities[index] * itemPrice;
    }, 0);

    router.push({
      pathname: "/consumer/vo",
      query: {
        cartItems: JSON.stringify(cartItems),
        quantities: JSON.stringify(quantities),
        price: totalPrice,
        //price: cartItems.reduce((total, item, index) => total + quantities[index] * Number(item.price), 0),
        //price: quantities * {dishPrice},

      },
    });
  };

  const handleGoBackToOrderPage = () => {
    router.push({
      pathname: "/consumer",
      query: {
        cartItems: JSON.stringify(cartItems),
        quantities: JSON.stringify(quantities),
      },
    });
  };

  const renderCartItems = () => {
    return cartItems.map((item, index) => (
      <ContainedListItem key={item.id} action={itemAction}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {quantities[index] > 1 && <Button onClick={() => decreaseQuantity(index)}>-</Button>}
            <Button onClick={() => increaseQuantity(index)}>+</Button>
            <span style={{ margin: "0 0.5rem" }}>Quantity: {quantities[index]}</span>
            <Button onClick={() => removeCartItem(index)}>Remove</Button>
          </div>
        </div>
      </ContainedListItem>
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "80%", margin: "auto", padding: "90px" }}>
      <ContainedList label="Cart Items" kind="on-page" action={''}>
        {renderCartItems()}
      </ContainedList>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleGoBackToOrderPage}>Go Back to Order Page</Button>
        <Button onClick={handleConfirmOrder}>Confirm Order</Button>
      </div>
    </div>
  );
}

export default WithInteractiveItemsAndActions;

