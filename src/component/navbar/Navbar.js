import React, { useState, Fragment } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import Drawercontent from "../Drawercontent/Drawercontent";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar(props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpenNav, setIsDrawerOpenNav] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openNavDrawer = () => {
    setIsDrawerOpenNav(true);
  };

  const closeDrawerNav = () => {
    setIsDrawerOpenNav(false);
  };

  return (
    <Fragment>
      <Box p={0} className="navbar__wrapper-box">
        <Flex
          align="center"
          maxW="1200px"
          m="0 auto"
          maxH="75px"
          className="nav-inner-wrapper"
        >
          <Heading className="logo-Conatainer" size="md" color="white">
            Your Logo
          </Heading>
          <Spacer />
          <Link className="nav-link" to="/">
            Home
          </Link>
      {/*--------------------------------Testing Singing PDF INTERFACE -----------------------*/}
          <Link className="nav-link" to="/test1">
            Test1
          </Link>

          {/*----------------------------------------------------------------------------------- */}

          <Link className="nav-link" to="/about">
            About
          </Link>
          <Link className="nav-link">Services</Link>
          <Link className="nav-link" onClick={openDrawer}>
            Login
          </Link>
          <Link className="Hamberger" onClick={openNavDrawer}>
            <GiHamburgerMenu></GiHamburgerMenu>
          </Link>
        </Flex>
      </Box>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="right"
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent className="login-drawer">
          <DrawerCloseButton />
          <DrawerHeader>Login</DrawerHeader>
          <DrawerBody>
            <Drawercontent></Drawercontent>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        isOpen={isDrawerOpenNav}
        onClose={closeDrawerNav}
        placement="right"
        size="xl"
      >
        <DrawerOverlay background="#EEEEEE">
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>NAVBAR</Heading>
          </DrawerHeader>
          <DrawerBody>
            <ul type="none" className="nav-container">
              <li onClick={closeDrawerNav} className="nav-mobile-link">
                <Link to="/">Home</Link>
              </li>
              <li onClick={closeDrawerNav} className="nav-mobile-link">
                <Link to="/about">About</Link>
              </li>
              <li onClick={closeDrawerNav} className="nav-mobile-link">
                <Link>Service</Link>
              </li>

              <li className="nav-mobile-link">
                <Link onClick={openDrawer}>Login</Link>
              </li>
            </ul>
          </DrawerBody>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
}

export default Navbar;
