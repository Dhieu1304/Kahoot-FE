import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext, useAuthStore } from "../../../providers/auth";
import groupService from "../../../services/groupService";

import classNames from "classnames/bind";
import styles from "./GroupPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/Button";
import { faAdd, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import GroupItem from "./components/GroupItem";
const cx = classNames.bind(styles);

function GroupPage() {
   const authStore = useAuthStore();

   const [groups, setGroups] = useState([]);

   const isMobile = useMediaQuery({ maxWidth: 767 });

   // const {
   //    recentGroupsList,
   //    updateRecentGroupsList,
   //    setCurrentSideBarMenuItem,
   //    showSideBar,
   //    setShowSideBar
   // } = useOutletContext();
   // const [groups, setGroups] = useState([]);

   const location = useLocation();

   // if location change, loadGroups in useEffect will check location.pathname and set GroupData
   useEffect(() => {
      const loadGroups = async () => {
         switch (location.pathname) {
            case "/group/owned": {
               const groupsData = await groupService.getGroupsByOwnUserId(authStore.user?.id);
               setGroups(groupsData);
               break;
            }
            case "/group/joined": {
               const groupsData = await groupService.getGroupsByJoinedUserId(authStore.user?.id);
               setGroups(groupsData);
               break;
            }
            default:
               break;
         }
      };
      loadGroups();
   }, [location, authStore.user?.id]);

   return (
      <div className={cx("wrapper", { isMobile })}>
         <div className={cx("container")}>
            <div className={cx("header")}>
               <div className={cx("nav")}>
                  <div className={cx("btn-group")}>
                     <Button
                        title={"Join"}
                        basic
                        basicTeal
                        rounded
                        big
                        className={cx("btn")}
                        leftIcon={<FontAwesomeIcon icon={faAdd} size="1x" />}
                        onClick={() => {
                           // return setShowJointGroupByLinkModalModal(true);
                        }}
                     />
                     <Button
                        title={"Create Group"}
                        basic
                        basicBlue
                        rounded
                        big
                        className={cx("btn")}
                        leftIcon={<FontAwesomeIcon icon={faAdd} size="1x" />}
                        onClick={() => {
                           // return setShowCreateGroupModal(true);
                        }}
                     />
                  </div>
               </div>
            </div>

            <div className={cx("group-list")}>
               {groups && groups.map((group, index) => <GroupItem key={index} data={group} />)}
               {groups && groups.map((group, index) => <GroupItem key={index} data={group} />)}
               {groups && groups.map((group, index) => <GroupItem key={index} data={group} />)}
               {groups && groups.map((group, index) => <GroupItem key={index} data={group} />)}
               {groups && groups.map((group, index) => <GroupItem key={index} data={group} />)}
            </div>
         </div>
      </div>
   );
}

export default GroupPage;
