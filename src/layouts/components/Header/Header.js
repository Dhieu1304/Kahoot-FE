import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import images from "../../../assets/images";
import HeaderItem from "./components/HeaderItem";
import styles from "./Header.module.scss";
import Button from "../../../components/Button/Button";
import Avatar from "../../../components/Avatar/Avatar";
import CustomToggleDropdownBtn from "../../../components/CustomToggleDropdownBtn";

import { headerItemsData } from "./config";
import * as localStorageApp from "../../../utils/localStorage";

const cx = classNames.bind(styles);

function Header() {
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
                        <div key={index} className={cx("navbar-left-link")}>
                           <HeaderItem
                              to={headerItem.link}
                              title={headerItem.title}
                              leftIcon={headerItem.leftIcon}
                           />
                        </div>
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

                     <Dropdown.Menu className={cx("header-navbar-drop-menu")}>
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
