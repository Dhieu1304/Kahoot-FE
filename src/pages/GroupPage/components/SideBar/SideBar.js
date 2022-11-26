import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/auth/provider";
import MenuItem from "./MenuItem";

import styles from "./SideBar.module.scss";

import * as localStorageApp from "../../../../utils/localStorage";

const cx = classNames.bind(styles);

const menuTopItems = [
   {
      name: "Groups I manage",
      leftIcon: <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-users" />,
      to: "owned"
   },

   {
      name: "Groups I've joined",
      leftIcon: <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-user" />,
      to: "joined"
   }
];

// const recentGroupsList = [
//    {
//       id: 1,
//       name: "Group 1"
//    },
//    {
//       id: 2,
//       name: "Group 2"
//    },
//    {
//       id: 3,
//       name: "Group 3"
//    }
// ];

function SideBar({
   currentSideBarMenuItem,
   setCurrentSideBarMenuItem,
   recentGroupsList,
   setRecentGroupsList
}) {
   const authContext = useContext(AuthContext);

   const handleUpdateRecentGroupsList = (group, index) => {
      console.log("handleUpdateRecentGroupsList");
      if (recentGroupsList.includes(group)) {
         console.log("old group");
         setCurrentSideBarMenuItem({
            type: "group",
            index: index
         });
      } else {
         console.log("new group");
         const newRecentGroupsList = [group, ...recentGroupsList];
         newRecentGroupsList.pop();
         setRecentGroupsList(newRecentGroupsList);
         localStorageApp.setItem(localStorageApp.LOCAL_STORAGE, newRecentGroupsList);
      }
   };

   return (
      <div className={cx("container")}>
         <div className={cx("top")}>
            <ul className={cx("menu")}>
               {menuTopItems.map((menuItem, index) => (
                  <Link to={menuItem.to} key={index}>
                     <MenuItem
                        label={menuItem.name}
                        leftIcon={menuItem.leftIcon}
                        active={
                           currentSideBarMenuItem.type === "groups" &&
                           currentSideBarMenuItem.index === index
                        }
                        onClick={() => {
                           setCurrentSideBarMenuItem({
                              type: "groups",
                              index: index
                           });
                        }}
                     />
                  </Link>
               ))}
            </ul>
         </div>
         <div className={cx("bottom")}>
            <span className={cx("title")}>Recent groups</span>
            <ul className={cx("menu")}>
               {recentGroupsList &&
                  recentGroupsList.map((group, index) => (
                     <Link to={group.id.toString()} key={index}>
                        <MenuItem
                           label={group.name}
                           active={
                              currentSideBarMenuItem.type === "group" &&
                              currentSideBarMenuItem.index === index
                           }
                           onClick={() => handleUpdateRecentGroupsList(group, index)}
                        />
                     </Link>
                  ))}
            </ul>
         </div>
      </div>
   );
}

export default SideBar;
