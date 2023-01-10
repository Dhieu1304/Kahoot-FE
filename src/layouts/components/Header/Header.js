import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

import HeaderItem from "./components/HeaderItem";
import images from "../../../assets/images";
import Button from "../../../components/Button/Button";
import Avatar from "../../../components/Avatar/Avatar";
import CustomToggleDropdownBtn from "../../../components/CustomToggleDropdownBtn";

import { privateHeaderItemsData, publicHeaderItemsData } from "./config";
import * as localStorageApp from "../../../utils/localStorage";
import { AuthContext } from "../../../providers/auth";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header() {
   const navigate = useNavigate();

   const authContext = useContext(AuthContext);

   return (
      <header className={cx("wrapper")}>
         <div className={cx("container")}>
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
                  {authContext.user ? (
                     <Nav className={cx("my-2 my-lg-0")}>
                        {privateHeaderItemsData.map((headerItem, index) => (
                           <div key={index} className={cx("navbar-left-link")}>
                              <HeaderItem
                                 to={headerItem.link}
                                 title={headerItem.title}
                                 leftIcon={headerItem.leftIcon}
                              />
                           </div>
                        ))}

                        <div className={cx("header-navbar-off-canvas-right")}>
                           {/*<div className={cx("btn-group")}>
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
                           </div>*/}
                        </div>
                     </Nav>
                  ) : (
                     <Nav className={cx("my-2 my-lg-0")}>
                        {publicHeaderItemsData.map((headerItem, index) => (
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
                                 title={"Login"}
                                 outline
                                 outlineBlack
                                 rounded
                                 big
                                 className={cx("header-btn")}
                                 onClick={() => {
                                    navigate("/auth/login");
                                 }}
                              />
                              <Button
                                 title={"Register"}
                                 basic
                                 basicBlue
                                 rounded
                                 big
                                 className={cx("header-btn")}
                                 onClick={() => {
                                    navigate("/auth/register");
                                 }}
                              />
                           </div>
                        </div>
                     </Nav>
                  )}
               </Navbar.Offcanvas>

               {authContext.user && (
                  <div className={cx("header-navbar-group-icons")}>
                     <Dropdown className={cx("avatar-icon-container")}>
                        <Dropdown.Toggle as={CustomToggleDropdownBtn} id="avatar-dropdown">
                           <Avatar
                              title={"Avatar"}
                              placeholder={"Avatar"}
                              size={40}
                              rounded
                              src={authContext?.user?.avatar}
                           />
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
                                 authContext.logout();
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
                        <FontAwesomeIcon icon={faBell} className={cx("notify-icon")} />
                     </div>
                  </div>
               )}
            </Navbar>
         </div>
      </header>
   );
}

export default Header;
