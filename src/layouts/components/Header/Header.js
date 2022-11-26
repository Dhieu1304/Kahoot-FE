import classNames from "classnames/bind";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import images from "../../../assets/images";
import HeaderItem from "./components/HeaderItem";
import styles from "./Header.module.scss";
import Button from "../../../components/Button/Button";
import Avatar from "../../../components/Avatar/Avatar";

import { headerItemsData } from "./config";
import { useState } from "react";
import { Dropdown, NavDropdown } from "react-bootstrap";
import CustomToggleDropdownBtn from "../../../components/CustomToggleDropdownBtn";

import * as localStorageApp from "../../../utils/localStorage";

const cx = classNames.bind(styles);

function Header() {
   const [headerItemActiveIndex, setHeaderItemActiveIndex] = useState(0);

   const navigate = useNavigate();

   return (
      <header className={cx("wrapper")}>
         {/* <Container className={cx("container")}> */}
         <Container>
            <Navbar bg="light" expand="lg">
               <Navbar.Brand as={Link} to={"/"}>
                  <div className={cx("logo-wrapper")}>
                     <img src={images.logo} alt="Kahoot" />
                  </div>
               </Navbar.Brand>
               <Navbar.Toggle
                  aria-controls="headerNavbar"
                  className={cx("header-navbar-toggle-btn")}
               />
               <Navbar.Offcanvas id="headerNavbar" className={cx("header-navbar-off-canvas")}>
                  <Nav className={cx("my-2 my-lg-0")}>
                     {headerItemsData.map((headerItem, index) => (
                        <Nav.Link
                           as={Link}
                           to={headerItem.link}
                           key={index}
                           className={cx("navbar-left-link")}
                        >
                           <HeaderItem
                              title={headerItem.title}
                              active={headerItemActiveIndex === index}
                              leftIcon={headerItem.leftIcon}
                              onClick={() => setHeaderItemActiveIndex(index)}
                           />
                        </Nav.Link>
                     ))}

                     <div className={cx("header-navbar-off-canvas-right")}>
                        <div className={cx("btn-group")}>
                           <Button
                              title={"Share"}
                              outline
                              outlineBlack
                              rounded
                              big
                              className={cx("header-btn")}
                           />
                           <Button
                              title={"Create"}
                              basic
                              basicBlue
                              rounded
                              big
                              className={cx("header-btn")}
                           />
                        </div>
                     </div>
                  </Nav>
               </Navbar.Offcanvas>

               <div className={cx("header-navbar-group-icons")}>
                  <Dropdown className={cx("avatar-icon-container")}>
                     <Dropdown.Toggle as={CustomToggleDropdownBtn} id="avatar-dropdown">
                        <Avatar title={"Avatar"} placeholder={"Avatar"} size={25} rounded />
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                        <Dropdown.Item
                           className={cx("menu-item")}
                           onClick={() => {
                              navigate("/profile");
                           }}
                        >
                           Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                           className={cx("menu-item")}
                           onClick={() => {
                              localStorageApp.removeItem(
                                 localStorageApp.LOCAL_STORAGE.ACCESS_TOKEN
                              );
                              localStorageApp.removeItem(
                                 localStorageApp.LOCAL_STORAGE.REFRESH_TOKEN
                              );
                              window.location.reload(false);
                           }}
                        >
                           Log out
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
                  <div className={cx("notify-icon-container")}>
                     <FontAwesomeIcon icon="fa-solid fa-bell" className={cx("notify-icon")} />
                  </div>
               </div>
            </Navbar>
         </Container>
      </header>
   );
}

export default Header;
