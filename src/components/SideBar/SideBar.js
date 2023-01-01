import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import * as localStorageApp from "../../utils/localStorage";
import SidebarItem from "./SidebarItem";

import styles from "./SideBar.module.scss";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth";
import { useEffect } from "react";

const cx = classNames.bind(styles);

// function SideBar({ recentGroupsList, setRecentGroupsList, showSideBar, setShowSideBar }) {
function SideBar({
   menuTop,
   menuBottomLabel,
   recentSideBarMenuBottomItems,
   preLink
   // handleUpdateSideBarMenuBottomItems
}) {
   // const handleUpdateSideBarMenuBottomItems = (item) => {
   //    if (recentSideBarMenuBottomItems.includes(item)) {
   //       // do nothing
   //    } else {
   //       const newRecentMenuBottomItems = [item, ...recentSideBarMenuBottomItems];
   //       newRecentMenuBottomItems.pop();
   //       setRecentGroupsList(newRecentMenuBottomItems);
   //       localStorageApp.setItem(localStorageApp.LOCAL_STORAGE, newRecentMenuBottomItems);
   //    }
   // };

   const render = () => {
      return (
         <div
            className={cx("container", {
               /*mobile*/
            })}
         >
            <div className={cx("top")}>
               <span className={cx("label")}>{menuTop?.label}</span>
               <ul className={cx("menu")}>
                  {menuTop?.items?.map((item, index) => (
                     <SidebarItem
                        to={item.to}
                        key={index}
                        label={item.name}
                        leftIcon={item.leftIcon}
                     />
                  ))}
               </ul>
            </div>
            <div className={cx("bottom")}>
               <span className={cx("label")}>{menuBottomLabel}</span>
               <ul className={cx("menu")}>
                  {recentSideBarMenuBottomItems?.map((item, index) => (
                     <SidebarItem
                        key={index}
                        to={`${preLink}/${item?.id.toString()}/user`}
                        label={item.name}
                        matchLink={`${preLink}/${item?.id.toString()}`}

                        // onClick={() => handleUpdateSideBarMenuBottomItems(item)}
                     />
                  ))}
               </ul>
            </div>
         </div>
      );
   };

   // return mobile ? (
   //    <Offcanvas id="groupSidebar" show={showSideBar} onHide={() => setShowSideBar(false)}>
   //       {render()}
   //    </Offcanvas>
   // ) : (
   //    <div>{render()}</div>
   // );

   return render();
}

export default SideBar;
