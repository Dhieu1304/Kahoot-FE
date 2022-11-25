import { div, Navbar, NavDropdown, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import classNames from "classnames/bind";

import Button from "../../../../../components/Button/Button";

import styles from "./TopBar.module.scss";
import Modal from "../../../../../components/Modal";
import CreateGroupModal from "../CreateGroupModal";

const cx = classNames.bind(styles);

function TopBar() {
   const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

   return (
      <div className={cx("container")}>
         <div className={cx("search-input-wrapper")}>
            <FontAwesomeIcon className={cx("search-icon")} icon="fa-solid fa-magnifying-glass" />
            <input type={"text"} placeholder="search" className={cx("search-input")} />
         </div>
         <div style={{ maxHeight: "100px" }}>
            <div>
               <Button
                  title={"Create Group"}
                  basic
                  basicBlue
                  rounded
                  big
                  onClick={() => {
                     console.log("Create Group");
                     return setShowCreateGroupModal(true);
                  }}
               />
            </div>
         </div>

         <CreateGroupModal
            show={showCreateGroupModal}
            setShow={setShowCreateGroupModal}
         ></CreateGroupModal>
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
