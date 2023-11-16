import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ContainedList, ContainedListItem, Button } from "@carbon/react";
import { Close20 as Close } from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";
import Ord from './order-confirm';

// const OneTimeDiv = () => {
//     const [hasRendered, setHasRendered] = useState(true);
  
//     useEffect(() => {
//       // Check if the flag is set in localStorage
//       const hasRenderedBefore = localStorage.getItem('hasRendered');
  
//       if (!hasRenderedBefore) {
//         // Render the div and set the flag in localStorage
//         setHasRendered(true);
//         localStorage.setItem('hasRendered', 'false');
//       }
//     }, []);
//     return hasRendered ? (
//         <div>
//           {/* Your one-time div content */}
//            <Ord />
//         </div>
//       ) : (<div></div>);
// }

function WithInteractiveItemsAndActions() {

  
  console.log("Cartitems");


  //const cartItems = useSelector((state) => state.cartItems);
  const onClick = action('onClick (ContainedListItem)');
  //const { dishId, dishName, dishPrice } = router.query;
  
  const itemAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} />;

  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [price, setPrice] = useState([]);
  const [queryParamNotAdded, setQueryParamNotAdded] = useState(true);

  console.log(cartItems);

  const router = useRouter();


  useEffect(() => {
    // Extract dish details from the router query
   const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
    
    const { quantities } = router.query;
    const { price } = router.query;
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
    setQuantities(quantities);
    setPrice(price);
    console.log("Hiiiiiii");
    console.log(setCartItems(parsedCartItems));

    // Update the quantities state based on the length of cart items
   // setQuantities(new Array(parsedCartItems.length).fill(1));
    
    // Handle other details like dishId, dishName, dishPrice as needed
    console.log('Dish Details:', cartItemsQuery);
    const s = localStorage.setItem("cart",cartItemsQuery);
 }, [router.query]);

//   useEffect(() => {
//     const { dishId, dishName, dishPrice, cartItems: cartItemsQuery } = router.query;
//     const parsedCartItems = cartItemsQuery ? JSON.parse(cartItemsQuery) : [];

//    // dispatch(clearCart());
//     parsedCartItems.forEach((item) => dispatch({ type: 'ADD_TO_CART', payload: item }));

//     console.log('Dish Details:', { dishId, dishName, dishPrice });
//   }, [router.query]);
  
  


  

  const renderCartItems = () => {
    
    return cartItems.map((item, index) => (
      
      <ContainedListItem key={item.id} action={itemAction}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center" }}>

          
           <span style={{ margin: "0 0.5rem" }}> Quantity: {quantities[index]}</span> 
            <span>Price : { [quantities[index]*item.price] }</span>
            
          </div>
        </div>
      </ContainedListItem>
    ));
    
  };

  const { dishId, dishName, dishPrice } = router.query;
  
//   const [hasRendered, setHasRendered] = useState(true);
  
//     useEffect(() => {
//       // Check if the flag is set in localStorage
//       const hasRenderedBefore = localStorage.getItem('hasRendered');
  
//       if (!hasRenderedBefore) {
//         // Render the div and set the flag in localStorage
//         setHasRendered(true);
//         localStorage.setItem('hasRendered', 'false');
//       }
//     }, []);
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
      {/* {hasRendered ? (<div> <Ord /></div>) : null} */}
      <ContainedList label="Cart Items" kind="on-page" action={''}>
      
        {renderCartItems()}
       
      </ContainedList>
      
    </div>
  );
}

export default WithInteractiveItemsAndActions;