import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContainedList, ContainedListItem, Button } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";

function WithInteractiveItemsAndActions() {
  const onClick = action("onClick (ContainedListItem)");
  //const { dishId, dishName, dishPrice } = router.query;
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={Close}
    />
  );

  // Create an array of quantities, one for each item
  const initialQuantities = [1];
  const [quantities, setQuantities] = useState([initialQuantities]);
  const [cartItems, setCartItems] = useState([]);

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
    // Extract dish details from the router query
    const {
      dishId,
      dishName,
      dishPrice,
      cartItems: cartItemsQuery,
    } = router.query;

    // Parse cartItems from the query string
    const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

    // Update the component state with the new cart items
    setCartItems(parsedCartItems);

    // Update the quantities state based on the length of cart items
    setQuantities(new Array(parsedCartItems.length).fill(1));

    // Handle other details like dishId, dishName, dishPrice as needed
    console.log("Dish Details:", { dishId, dishName, dishPrice });
  }, [router.query]);

  const handleConfirmOrder = () => {
    const isCartEmpty = cartItems.length === 0;

    if (isCartEmpty) {
      alert(
        "Your cart is empty. Please add items to your cart before confirming the order."
      );
      return;
    }

    router.push("./order-confirm");
  };

  const handleGoBackToOrderPage = () => {
    router.push("/consumer");
  };

  const renderCartItems = () => {
    return cartItems.map((item, index) => (
      <ContainedListItem key={item.id} action={itemAction}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {quantities[index] > 1 && (
              <Button onClick={() => decreaseQuantity(index)}>-</Button>
            )}
            <Button onClick={() => increaseQuantity(index)}>+</Button>
            <span style={{ margin: "0 0.5rem" }}>
              Quantity: {quantities[index]}
            </span>

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
        height: "100vh",
        width: "80%",
        margin: "auto",
        padding: "90px",
      }}
    >
      <ContainedList label="Cart Items" kind="on-page" action={""}>
        {renderCartItems()}
      </ContainedList>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button onClick={handleGoBackToOrderPage}>Go Back to Order Page</Button>
        <Button onClick={handleConfirmOrder}>Confirm Order</Button>
      </div>
    </div>
  );
}

export default WithInteractiveItemsAndActions;
