import classNames from "classnames/bind";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import images from "../../../assets/images";
import HeaderItem from "./components/HeaderItem";
import styles from "./Header.module.scss";
import Button from "../../../components/Button/Button";
import Avatar from "../../../components/Avatar/Avatar";

const cx = classNames.bind(styles);

function Header() {
   return (
      <header className={cx("wrapper")}>
         <div className={cx("container")}>
            <Navbar bg="light" expand="lg">
               <Navbar.Brand href="#home">
                  <div className={cx("logo-wrapper")}>
                     <img src={images.logo} alt="Kahoot" />
                  </div>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="headerNavbar" />
               <Navbar.Collapse id="headerNavbar">
                  <Nav className="me-auto">
                     <Nav.Item>
                        <Nav.Link as={Link} to="/">
                           <HeaderItem
                              title={"Home"}
                              active
                              leftIcon={<FontAwesomeIcon icon="fa-solid fa-house" />}
                           />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link as={Link} to="/">
                           <HeaderItem
                              title={"Discover"}
                              leftIcon={<FontAwesomeIcon icon="fa-solid fa-compass" />}
                           />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link as={Link} to="/">
                           <HeaderItem
                              title={"Library"}
                              leftIcon={<FontAwesomeIcon icon="fa-solid fa-list" />}
                           />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link as={Link} to="/group">
                           <HeaderItem
                              title={"Group"}
                              leftIcon={<FontAwesomeIcon icon="fa-solid fa-users" />}
                           />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link>
                           <HeaderItem
                              title={"Market"}
                              leftIcon={<FontAwesomeIcon icon="fa-solid fa-shop" />}
                           />
                        </Nav.Link>
                     </Nav.Item>
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
                     <Nav.Item>
                        <Nav.Link href="">
                           <Avatar title={"Avatar"} placeholder={"Avatar"} size={25} rounded />
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link href="">
                           <div className={cx("notify-icon-wrapper")}>
                              <FontAwesomeIcon icon="fa-solid fa-bell" />
                           </div>
                        </Nav.Link>
                     </Nav.Item>
                  </Nav>
               </Navbar.Collapse>
            </Navbar>
         </div>
      </header>
   );
   // return (
   //     <div>
   //         <img src={images.logo} alt="Kahoot" />
   //         <h1>Header</h1>;
   //     </div>
   // );
}

export default Header;