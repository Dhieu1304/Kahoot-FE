import { div, Navbar, NavDropdown, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";

import Button from "../../../../../components/Button/Button";

import styles from "./TopBar.module.scss";
import InviteToGroupModal from "../InviteToGroupModal";
import { useState } from "react";

const cx = classNames.bind(styles);

function TopBar({ groupId }) {
   const [showInviteToGroupModal, setShowInviteToGroupModal] = useState(false);

   console.log("groupId in Topbar: ", groupId);
   return (
      <div className={cx("container")}>
         <div className={cx("tabs")}>
            <div className={cx("tab-item")}>
               <div className={cx("tab-item-link")}>
                  <span className={cx("tab-item-label")}>Activity</span>
               </div>
            </div>
            <div className={cx("tab-item", { active: true })}>
               <div className={cx("tab-item-link")}>
                  <span className={cx("tab-item-label")}>Users</span>
               </div>
            </div>
            <div className={cx("tab-item")}>
               <div className={cx("tab-item-link")}>
                  <span className={cx("tab-item-label")}>Shared</span>
               </div>
            </div>
            <div className={cx("tab-item")}>
               <div className={cx("tab-item-link")}>
                  <span className={cx("tab-item-label")}>Assignments</span>
               </div>
            </div>
            <div className={cx("tab-item")}>
               <div className={cx("tab-item-link")}>
                  <span className={cx("tab-item-label")}>Activity</span>
               </div>
            </div>
         </div>
         <div style={{ maxHeight: "100px" }}>
            <div>
               <Button
                  title={"Intive"}
                  basic
                  basicBlue
                  rounded
                  big
                  onClick={() => {
                     console.log("Invite to Group");
                     return setShowInviteToGroupModal(true);
                  }}
               />
            </div>
         </div>

         <InviteToGroupModal
            show={showInviteToGroupModal}
            setShow={setShowInviteToGroupModal}
            groupId={groupId}
         ></InviteToGroupModal>
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
