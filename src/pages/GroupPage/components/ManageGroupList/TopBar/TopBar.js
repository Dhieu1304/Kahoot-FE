import { div, Navbar, NavDropdown, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import classNames from "classnames/bind";

import Button from "../../../../../components/Button/Button";

import styles from "./TopBar.module.scss";
import Modal from "../../../../../components/Modal";
import CreateGroupModal from "../CreateGroupModal";
import JointGroupByLinkModal from "../JointGroupByLinkModal";

const cx = classNames.bind(styles);

function TopBar() {
   const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
   const [showJointGroupByLinkModalModal, setShowJointGroupByLinkModalModal] = useState(false);

   return (
      <div className={cx("container")}>
         <div className={cx("search-input-wrapper")}>
            <FontAwesomeIcon className={cx("search-icon")} icon="fa-solid fa-magnifying-glass" />
            <input type={"text"} placeholder="search" className={cx("search-input")} />
         </div>
         <div style={{ maxHeight: "100px", marginLeft: 10 }}>
            <div>
               <Button
                  title={"Joint"}
                  basic
                  basicTeal
                  rounded
                  big
                  onClick={() => {
                     return setShowJointGroupByLinkModalModal(true);
                  }}
               />
            </div>
         </div>
         <div style={{ maxHeight: "100px", marginLeft: 10 }}>
            <div>
               <Button
                  title={"Create Group"}
                  basic
                  basicBlue
                  rounded
                  big
                  onClick={() => {
                     return setShowCreateGroupModal(true);
                  }}
               />
            </div>
         </div>

         <CreateGroupModal
            show={showCreateGroupModal}
            setShow={setShowCreateGroupModal}
         ></CreateGroupModal>
         <JointGroupByLinkModal
            show={showJointGroupByLinkModalModal}
            setShow={setShowJointGroupByLinkModalModal}
         ></JointGroupByLinkModal>
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
