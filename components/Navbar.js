// components/NavBar.js
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
    <Header aria-label="Carbon Tutorial">
      <HeaderName href="/" prefix="IBM">
        Straw Hats
      </HeaderName>
      <HeaderNavigation aria-label="Carbon Tutorial">
        <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
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
  );
};

export default NavBar;
