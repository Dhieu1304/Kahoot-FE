import { div, Navbar, NavDropdown, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";

import classNames from "classnames/bind";

import Button from "../../../../../components/Button/Button";

import styles from "./TopBar.module.scss";
import InviteToGroupModal from "../InviteToGroupModal";
import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function TopBar({ groupId, showSideBar, setShowSideBar }) {
   const [showInviteToGroupModal, setShowInviteToGroupModal] = useState(false);

   const mobile = useMediaQuery({ query: "(max-width: 1224px)" });

   return (
      <div className={cx("container")}>
         <div className={cx("tabs")} style={{ overflowX: "scroll" }}>
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
         <div className={cx("group-btns")}>
            <div className={cx("btn-wrapper")}>
               <Button
                  title={"Intive"}
                  basic
                  basicBlue
                  rounded
                  big
                  onClick={() => {
                     return setShowInviteToGroupModal(true);
                  }}
               />
            </div>
            {mobile && (
               <FontAwesomeIcon
                  className={cx("btn-toggle-icon")}
                  icon={faBars}
                  onClick={() => {
                     setShowSideBar(!showSideBar);
                  }}
               />
            )}
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
