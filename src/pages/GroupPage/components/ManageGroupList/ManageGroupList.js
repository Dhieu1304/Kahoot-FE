import classNames from "classnames/bind";

import GroupItem from "./GroupItem";
import TopBar from "./TopBar";

import styles from "./ManageGroupList.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGroupsByOwnUserId } from "../../../../services/groupService";
const cx = classNames.bind(styles);

function ManageGroupList() {
   const [groups, setGroups] = useState([]);

   const navigate = useNavigate();

   const location = useLocation();

   useEffect(() => {
      console.log("useEffect: ");
      const loadGroups = async () => {
         console.log("loadGroups: ");
         console.log("location: ", location);
         if (location.pathname === "/group/owned") {
            console.log("Onwed");
            const groupsData = await getGroupsByOwnUserId(1);
            setGroups(groupsData);
         }
         if (location.pathname === "/group/joined") {
            console.log("Joined");
            const groupsData = await getGroupsByOwnUserId(1);
            setGroups(groupsData);
         }
      };
      loadGroups();
   }, []);

   console.log("groups: ", groups);

   return (
      <div className={cx("container")}>
         <TopBar />
         <div className={cx("group-list")}>
            {groups.map((group, index) => (
               <GroupItem key={index} data={group} />
            ))}
         </div>
      </div>
   );
}

export default ManageGroupList;
