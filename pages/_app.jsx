import "../styles/globals.scss";
import { Theme } from "@carbon/react";
//mport { CartProvider } from '../components/CartContext';

import NavBar from "../components/Navbar";
import ProtectedRoute from "../lib/firebase/auth";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Theme theme="g90">
      <Provider store={store}>
        <ProtectedRoute>
          <NavBar />
          <Component {...pageProps} />
        </ProtectedRoute>        
      </Provider>
    </Theme>
  );
}

export default MyApp;
