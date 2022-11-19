import { Nav, Navbar, NavDropdown, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";

import Button from "../../../../../components/Button/Button";

import styles from "./TopBar.module.scss";

const cx = classNames.bind(styles);

function TopBar() {
   return (
      <div className={cx("container")}>
         <Navbar bg="light" expand="lg">
            <Container fluid>
               <Navbar.Toggle aria-controls="groupTopBarScroll" />
               <Navbar.Collapse id="groupTopBarScroll">
                  <Nav className={cx("tabs")}>
                     <Nav.Item className={cx("tab-item")}>
                        <Nav.Link className={cx("tab-item-link")}>
                           <span className={cx("tab-item-label")}>Activity</span>
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item className={cx("tab-item", { active: true })}>
                        <Nav.Link className={cx("tab-item-link")}>
                           <span className={cx("tab-item-label")}>Users</span>
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item className={cx("tab-item")}>
                        <Nav.Link className={cx("tab-item-link")}>
                           <span className={cx("tab-item-label")}>Shared</span>
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item className={cx("tab-item")}>
                        <Nav.Link className={cx("tab-item-link")}>
                           <span className={cx("tab-item-label")}>Assignments</span>
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item className={cx("tab-item")}>
                        <Nav.Link className={cx("tab-item-link")}>
                           <span className={cx("tab-item-label")}>Activity</span>
                        </Nav.Link>
                     </Nav.Item>
                  </Nav>
                  <Nav style={{ maxHeight: "100px" }} navbarScroll>
                     <Nav.Item>
                        <Button title={"Share"} basic basicBlue rounded big />
                     </Nav.Item>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </div>
   );
}

{
   /* <Button
title={"Create Group"}
basic
basicBlue
rounded
big
/> */
}

export default TopBar;
