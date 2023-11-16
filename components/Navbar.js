import React from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react";
import {
  Search,
  Notification,
  Fade,
  Switcher as SwitcherIcon,
  ShoppingCart,
  UserProfile,
} from "@carbon/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/slices/authSlice";

const NavBar = () => {
  const { user, loadingUser } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(signOut());
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#450d73",
      }}
    >
      {/* Move the login form to the left */}

      {/* Carbon Header */}
      <Header
        aria-label="Carbon Tutorial"
        style={{ backgroundColor: "#450d73" }}
      >
        <HeaderName href="/" style={{ color: "white" }} prefix="IBM">
          Straw Hats
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial"></HeaderNavigation>
        {user && (
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Orders" onClick={() => {}}>
              <ShoppingCart
                size={20}
                onClick={() => router.push("/service-provider/orders")}
              />{" "}
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Sign out" onClick={() => {}}>
              <UserProfile size={20} onClick={handleLogout} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        )}
      </Header>
    </div>
  );
};

export default NavBar;
