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
                        <div className={cx("search-input-wrapper")}>
                            <FontAwesomeIcon
                                className={cx("search-icon")}
                                icon="fa-solid fa-magnifying-glass"
                            />
                            <input
                                type={"text"}
                                placeholder="search"
                                className={cx("search-input")}
                            />
                        </div>
                        <Nav style={{ maxHeight: "100px" }} navbarScroll>
                            <Nav.Item>
                                <Button
                                    title={"Create Group"}
                                    basic
                                    basicBlue
                                    rounded
                                    big
                                />
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
