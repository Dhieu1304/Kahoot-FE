import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import SideBar from "./components/SideBar";

import styles from "./GroupPage.module.scss";
import ManageGroupList from "./components/ManageGroupList";
import ManageGroup from "./components/ManageGroup/ManageGroup";
import { Outlet, Route, Routes, useNavigate, useLocation } from "react-router-dom";

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

const recentGroupsList = [
   {
      id: 1,
      name: "Group 1"
   },
   {
      id: 2,
      name: "Group 2"
   },
   {
      id: 3,
      name: "Group 3"
   }
];

function GroupPage() {
   const [currentSideBarMenuItem, setCurrentSideBarMenuItem] = useState({
      type: "groups",
      index: 0
   });

   const navigate = useNavigate();

   const location = useLocation();

   useEffect(() => {
      if (location.pathname === "/group") {
         setCurrentSideBarMenuItem({
            type: "groups",
            index: 0
         });
         navigate("/group/owned", { replace: true });
      }
   });

   return (
      <div className={cx("wrapper")}>
         <SideBar
            menuTopItems={menuTopItems}
            recentGroupsList={recentGroupsList}
            currentSideBarMenuItem={currentSideBarMenuItem}
            setCurrentSideBarMenuItem={setCurrentSideBarMenuItem}
         />

         <div className={cx("container")}>
            <Outlet />
         </div>
      </div>
   );
}

export default GroupPage;
