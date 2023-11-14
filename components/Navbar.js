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
} from "@carbon/icons-react";



const NavBar = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px",
      backgroundColor: "#450d73",
      }}>
      {/* Move the login form to the left */}

      {/* Carbon Header */}
      <Header aria-label="Carbon Tutorial" style={{backgroundColor: "#450d73",}}>
        <HeaderName href="/" style={{color:"white",}} prefix="IBM">
          Straw Hats
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial" >
          <HeaderMenuItem style={{backgroundColor: "#450d73", color:"white",}} href="#">Link 1</HeaderMenuItem>
          <HeaderMenuItem  style={{backgroundColor: "#450d73", color:"white",}} href="#">Link 2</HeaderMenuItem>
          <HeaderMenuItem style={{backgroundColor: "#450d73", color:"white",}} href="#">Link 3</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar >
          <HeaderGlobalAction aria-label="Notifications" onClick={() => {}} >
            <Search size={20} />{" "}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User Avatar" onClick={() => {}}>
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <SwitcherIcon size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </div>
  );
};

export default NavBar;
