import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate, useLocation } from "react-router-dom";

import classNames from "classnames/bind";
import SideBar from "./components/SideBar";
import styles from "./GroupPage.module.scss";

import * as localStorageApp from "../../utils/localStorage";
import { AuthContext } from "../../providers/auth/provider";

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

function GroupPage() {
   const authContext = useContext(AuthContext);

   const navigate = useNavigate();

   const location = useLocation();

   const [recentGroupsList, setRecentGroupsList] = useState([]);

   const [showSideBar, setShowSideBar] = useState(false);

   useEffect(() => {
      const recentGroupsListObject = localStorageApp.getItem(
         localStorageApp.LOCAL_STORAGE.RECENT_GROUPS
      );

      if (authContext.user.id) {
         if (recentGroupsListObject && recentGroupsListObject[authContext.user.id]) {
            const recentGroupsListFromLocal = recentGroupsListObject[authContext.user.id];
            setRecentGroupsList(recentGroupsListFromLocal);
         } else {
            localStorageApp.setItem(localStorageApp.LOCAL_STORAGE.RECENT_GROUPS, {
               [authContext.user.id]: recentGroupsList
            });
         }
      }
   }, [authContext.user.id]);

   useEffect(() => {
      if (location.pathname === "/group") {
         navigate("/group/owned", { replace: true });
      }
   });

   const updateRecentGroupsList = (newRecentGroupsList) => {
      localStorageApp.setItem(localStorageApp.LOCAL_STORAGE.RECENT_GROUPS, {
         [authContext.user.id]: newRecentGroupsList
      });

      setRecentGroupsList(newRecentGroupsList);
   };

   return (
      <div className={cx("wrapper")}>
         <SideBar
            menuTopItems={menuTopItems}
            recentGroupsList={recentGroupsList}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
         />

         <div className={cx("container")}>
            <Outlet
               context={{ recentGroupsList, updateRecentGroupsList, showSideBar, setShowSideBar }}
            />
         </div>
      </div>
   );
}

export default GroupPage;
