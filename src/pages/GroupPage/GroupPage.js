import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classNames from "classnames/bind";
import SideBar from "./components/SideBar";
import styles from "./GroupPage.module.scss";
import ManageGroupList from "./components/ManageGroupList";
import ManageGroup from "./components/ManageGroup/ManageGroup";
import { Route, Routes } from "react-router-dom";

const cx = classNames.bind(styles);

const menuTopItems = [
   {
      name: "Groups I manage",
      leftIcon: <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-users" />
   },

   {
      name: "Groups I've joined",
      leftIcon: <FontAwesomeIcon className={cx("icon")} icon="fa-solid fa-user" />
   }
];

const recentGroupsList = [
   {
      name: "Group 1"
   },
   {
      name: "Group 2"
   },
   {
      name: "Group 3"
   }
];

function GroupPage() {
   const [menuTopItemActiveIndex, setMenuTopItemActiveIndex] = useState(
      menuTopItems.length >= 0 ? 0 : -1
   );
   const [recentGroupItemActiveIndex, setRecentGroupItemActiveIndex] = useState(-1);

   const handleMenuTopItemClick = (index) => {
      setMenuTopItemActiveIndex(index);
      setRecentGroupItemActiveIndex(-1);
   };

   const handleGroupItemClick = (index) => {
      setMenuTopItemActiveIndex(-1);
      setRecentGroupItemActiveIndex(index);
   };

   console.log("GroupPage re-render");

   return (
      <div className={cx("wrapper")}>
         <SideBar
            menuTopItems={menuTopItems}
            recentGroupsList={recentGroupsList}
            menuTopItemActiveIndex={menuTopItemActiveIndex}
            recentGroupItemActiveIndex={recentGroupItemActiveIndex}
            handleMenuTopItemClick={handleMenuTopItemClick}
            handleGroupItemClick={handleGroupItemClick}
         />

         <div className={cx("container")}>
            <Routes>
               <Route path={"manageGroupList/*"} element={<ManageGroupList />} />
               <Route path={"manageGroup/*"} element={<ManageGroup />} />
            </Routes>
         </div>
      </div>
   );
}

export default GroupPage;
