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
import { Dropdown } from "react-bootstrap";
import CustomToggleDropdownBtn from "../../../components/CustomToggleDropdownBtn";

import * as localStorageApp from "../../../utils/localStorage";

const cx = classNames.bind(styles);

function Header() {
   const [headerItemActiveIndex, setHeaderItemActiveIndex] = useState(0);

   const navigate = useNavigate();

   return (
      <header className={cx("wrapper")}>
         <Container className={cx("container")}>
            <Navbar bg="light" expand="lg">
               <Navbar.Brand href="#home">
                  <div className={cx("logo-wrapper")}>
                     <img src={images.logo} alt="Kahoot" />
                  </div>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="headerNavbar" />
               <Navbar.Collapse id="headerNavbar">
                  <Nav className="me-auto">
                     {headerItemsData.map((headerItem, index) => (
                        <Nav.Item key={index}>
                           <Nav.Link as={Link} to={headerItem.link}>
                              <HeaderItem
                                 title={headerItem.title}
                                 active={headerItemActiveIndex === index}
                                 leftIcon={headerItem.leftIcon}
                                 onClick={() => setHeaderItemActiveIndex(index)}
                              />
                           </Nav.Link>
                        </Nav.Item>
                     ))}
                  </Nav>
                  <Nav>
                     <Nav.Item>
                        <Nav.Link href="">
                           <Button title={"Share"} outline outlineBlack rounded big />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link href="">
                           <Button title={"Create"} basic basicBlue rounded big />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item className="d-flex align-items-center">
                        <Dropdown>
                           <Dropdown.Toggle as={CustomToggleDropdownBtn} id="avatar-dropdown">
                              <Avatar title={"Avatar"} placeholder={"Avatar"} size={25} rounded />
                           </Dropdown.Toggle>

                           <Dropdown.Menu>
                              <Dropdown.Item>
                                 <Link to={"/"}>Profile</Link>
                              </Dropdown.Item>
                              <Dropdown.Item
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
                     </Nav.Item>
                     <Nav.Item className="d-flex align-items-center">
                        <Nav.Link href="" className="d-flex align-items-center">
                           <div className={cx("notify-icon-wrapper")}>
                              <FontAwesomeIcon icon="fa-solid fa-bell" />
                           </div>
                        </Nav.Link>
                     </Nav.Item>
                  </Nav>
               </Navbar.Collapse>
            </Navbar>
         </Container>
      </header>
   );
}

export default Header;
