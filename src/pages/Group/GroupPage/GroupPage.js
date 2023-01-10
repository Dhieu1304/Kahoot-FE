import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

import { useAuthStore } from "../../../providers/auth";
import groupService from "../../../services/groupService";
import Button from "../../../components/Button";
import GroupItem from "./components/GroupItem";
import { useModal } from "../../../components/Modal";
import CreateGroupModal from "./components/CreateGroupModal";
import JointGroupByLinkModal from "./components/JointGroupByLinkModal";
import images from "../../../assets/images";

import classNames from "classnames/bind";
import styles from "./GroupPage.module.scss";
const cx = classNames.bind(styles);

function GroupPage() {
   const authStore = useAuthStore();

   const [groups, setGroups] = useState([]);
   const [groupManageTitle, setGroupManageTitle] = useState("My Group");

   const isMobile = useMediaQuery({ maxWidth: 767 });

   const createGroupModal = useModal();
   const jointGroupByLinkModal = useModal();

   const location = useLocation();

   // if location change, loadGroups in useEffect will check location.pathname and set GroupData
   useEffect(() => {
      const loadGroups = async () => {
         switch (location.pathname) {
            case "/group/owned": {
               const groupsData = await groupService.getGroupsByOwnUserId(authStore.user?.id);
               setGroups(groupsData);
               setGroupManageTitle("My Owned Group");
               break;
            }
            case "/group/joined": {
               const groupsData = await groupService.getGroupsByJoinedUserId(authStore.user?.id);
               setGroups(groupsData);
               setGroupManageTitle("My Joined Group");
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
                  <h1 className={cx("title")}>{groupManageTitle}</h1>
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
                           jointGroupByLinkModal.setShow(true);
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
                           createGroupModal.setShow(true);
                        }}
                     />
                  </div>
               </div>
            </div>

            {groups && groups?.length > 0 ? (
               <div className={cx("group-list")}>
                  {groups?.map((group, index) => (
                     <GroupItem key={index} group={group} />
                  ))}
               </div>
            ) : (
               <div className={cx("no-data")}>
                  <img className={cx("no-data-img")} src={images.noData} />
               </div>
            )}
         </div>
         <>
            {createGroupModal.show && (
               <CreateGroupModal
                  show={createGroupModal.show}
                  setShow={createGroupModal.setShow}
               ></CreateGroupModal>
            )}

            {jointGroupByLinkModal.show && (
               <JointGroupByLinkModal
                  show={jointGroupByLinkModal.show}
                  setShow={jointGroupByLinkModal.setShow}
               ></JointGroupByLinkModal>
            )}
         </>
      </div>
   );
}

export default GroupPage;
