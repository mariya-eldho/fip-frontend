// import { useRouter } from 'next/router';

// const YourCartPage = () => {
//   const router = useRouter();
//   const { dishId, dishName, dishPrice } = router.query;

//   // Now you have access to dish information in the component
//   console.log('Dish ID:', dishId);
//   console.log('Dish Name:', dishName);
//   console.log('Dish Price:', dishPrice);

//   // Rest of your "/consumer/yourcart" page logic
// };

// export default YourCartPage;

import CartPage from "./CP";

function Cart() {

  return(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
        <CartPage />
        </div>
  ); 
};
 export default Cart;
