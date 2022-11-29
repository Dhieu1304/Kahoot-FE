import classNames from "classnames/bind";

import GroupItem from "./GroupItem";
import TopBar from "./TopBar";

import styles from "./ManageGroupList.module.scss";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getGroupsByOwnUserId, getGroupsByJoinedUserId } from "../../../../services/groupService";
import { AuthContext } from "../../../../providers/auth/provider";
const cx = classNames.bind(styles);

function ManageGroupList() {
   const authContext = useContext(AuthContext);

   const { recentGroupsList, updateRecentGroupsList, setCurrentSideBarMenuItem } =
      useOutletContext();
   const [groups, setGroups] = useState([]);

   const location = useLocation();

   // if location change, loadGroups in useEffect will check location.pathname and set GroupData
   useEffect(() => {
      const loadGroups = async () => {
         switch (location.pathname) {
            case "/group/owned": {
               const groupsData = await getGroupsByOwnUserId(authContext.user.id);
               setGroups(groupsData);
               break;
            }
            case "/group/joined": {
               const groupsData = await getGroupsByJoinedUserId(authContext.user.id);
               setGroups(groupsData);
               break;
            }
            default:
               break;
         }
      };
      loadGroups();
   }, [location, authContext.user.id]);

   const handleUpdateRecentGroupsList = (group) => {
      let menuIndex = -1;

      if (
         recentGroupsList.some((recentGroup, index) => {
            if (recentGroup.id === group.id) menuIndex = index;
            return recentGroup.id === group.id;
         })
      ) {
         setCurrentSideBarMenuItem({
            type: "group",
            index: menuIndex
         });
      } else {
         const newRecentGroupsList = [group, ...recentGroupsList];
         if (newRecentGroupsList.length > 5) {
            newRecentGroupsList.pop();
         }
         updateRecentGroupsList(newRecentGroupsList);
      }
   };

   return (
      <div className={cx("container")}>
         <TopBar />
         <div className={cx("group-list")}>
            {groups &&
               groups.map((group, index) => (
                  <GroupItem
                     key={index}
                     data={group}
                     onClick={() => handleUpdateRecentGroupsList(group)}
                  />
               ))}
         </div>
      </div>
   );
}

export default ManageGroupList;
