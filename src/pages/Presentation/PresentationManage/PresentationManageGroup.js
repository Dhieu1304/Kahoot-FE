import {
   faAdd,
   faEdit,
   faPaperPlane,
   faPen,
   faPlayCircle,
   faSliders,
   faTrash,
   faX
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import dateFormat from "date-and-time";

import Button from "../../../components/Button";
import { usePresentationManageStore, usePresentationStore } from "./store";

import Table, {
   TableTHead,
   TableTBody,
   TableTd,
   TableTh,
   TableTr,
   useTableSelect
} from "../../../components/Table";

import { usePresenationManageLayoutStore } from "../../../layouts/PresenationManageLayout";

import classNames from "classnames/bind";
import styles from "./PresentationManage.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth";
import Tabs from "../../../components/Tabs";
import DeleteModal from "../components/DeleteModal";
import AddGroupToPresentationModal from "../components/AddGroupToPresentationModal";
const cx = classNames.bind(styles);

const tabItems = [
   {
      label: "Users",
      to: "user"
   },
   {
      label: "Groups",
      to: "group"
   },
   {
      label: "Report",
      to: "report"
   }
];

function PresentationManageGroup() {
   const presentationManageStore = usePresentationManageStore();

   console.log("presentationManageStore: ", presentationManageStore);
   const authContext = useContext(AuthContext);

   const {
      renameModal,
      deletePresentationModal,
      deleteMemberModal,
      inviteModal,
      addGroupModal,
      deleteGroupModal
   } = presentationManageStore;

   const { isSelectAll, selectedRowIds, handleSelectedAll, handleSelected, setRowIds } =
      useTableSelect([]);

   // show/hide modal state
   const { createModal } = usePresenationManageLayoutStore();

   // responsive
   const isDesktop = useMediaQuery({ minWidth: 992 });
   const isMobile = useMediaQuery({ maxWidth: 767 });
   const isNotMobile = useMediaQuery({ minWidth: 768 });

   const navigate = useNavigate();
   const location = useLocation();
   const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];

   useEffect(() => {
      // load data
      const loadData = async () => {
         const presentation = await presentationManageStore.method.initPresentationDetail(
            presentationId
         );
         if (presentation) {
            const { presentationMembers } = presentation;
            setRowIds((prev) => {
               return presentationMembers?.map((member) => member?.userId);
            });
         }
         presentationManageStore.method.setInit();
      };
      loadData();
   }, []);

   const handleAddGroup = async ({ group }) => {
      const groupId = group?.id;
      console.log("handleAddGroup: ", { groupId });
      const result = await presentationManageStore.method.addGroup(groupId);
   };

   const handleDeleteGroup = async () => {
      const groupId = deleteGroupModal?.data;
      console.log("handleDeleteGroup: ", { groupId });
      const result = await presentationManageStore.method.deleteGroup(groupId);
   };

   return (
      presentationManageStore.state.isInit && (
         <div
            className={cx("wrapper", {
               isMobile
            })}
         >
            <div className={cx("container")}>
               <div className={cx("header")}>
                  <div className={cx("nav")}>
                     <Tabs
                        tabItems={tabItems}
                        preLink={`/presentation/${presentationManageStore.state.presentation?.id}`}
                     />
                     <div className={cx("btn-group")}>
                        <Button
                           title="Slides"
                           basicTeal
                           big
                           rounded
                           className={cx("btn")}
                           leftIcon={<FontAwesomeIcon icon={faPen} size="1x" />}
                           onClick={() => {
                              navigate(`/presentation/${presentationId}/edit`);
                           }}
                        />
                        <Button
                           title="Add group"
                           basicBlue
                           big
                           rounded
                           className={cx("btn")}
                           leftIcon={<FontAwesomeIcon icon={faAdd} size="1x" />}
                           onClick={() => {
                              addGroupModal.setShow(true);
                           }}
                        />
                     </div>
                  </div>

                  <h1 className={cx("title")}>
                     {presentationManageStore.state.presentation?.name}
                     <FontAwesomeIcon
                        icon={faPlayCircle}
                        className={cx("icon")}
                        size="1x"
                        onClick={() => {
                           navigate(`/presentation/${presentationId}/play`);
                        }}
                     />
                  </h1>
               </div>

               {isNotMobile ? (
                  <Table>
                     <TableTHead>
                        <TableTr>
                           <TableTh>Id</TableTh>
                           <TableTh>Name</TableTh>

                           <TableTh></TableTh>
                        </TableTr>
                     </TableTHead>
                     <TableTBody>
                        {presentationManageStore.state.groups?.map((group, index) => {
                           const isChecked = selectedRowIds?.includes(group?.groupId);
                           return (
                              <TableTr key={index}>
                                 <TableTd>{group?.groupId}</TableTd>
                                 <TableTd>
                                    <div className={cx("presentation-infor-cell")}>
                                       {group?.group?.name}
                                    </div>
                                 </TableTd>
                                 <TableTd>
                                    {authContext.user?.id !== group?.userId && (
                                       <FontAwesomeIcon
                                          icon={faTrash}
                                          className={cx("icon")}
                                          size="1x"
                                          color="red"
                                          onClick={() => {
                                             deleteGroupModal.setData(group?.groupId);
                                             deleteGroupModal.setShow(true);
                                          }}
                                       />
                                    )}
                                 </TableTd>
                              </TableTr>
                           );
                        })}
                     </TableTBody>
                  </Table>
               ) : (
                  <ListGroup className={cx("list")}>
                     {presentationManageStore.state.groups?.map((group, index) => {
                        return (
                           <ListGroup.Item className={cx("item")} key={index}>
                              <div className={cx("top")}>
                                 <div className={cx("infor")}>{group?.group?.name}</div>

                                 <div className={cx("action")}>
                                    <FontAwesomeIcon
                                       icon={faTrash}
                                       className={cx("icon")}
                                       size="1x"
                                       color="red"
                                       onClick={() => {
                                          deleteMemberModal.setData(group?.groupId);
                                          deleteMemberModal.setShow(true);
                                       }}
                                    />
                                 </div>
                              </div>
                              <div className={cx("bottom")}>
                                 <span className={cx("role")}></span>
                              </div>
                           </ListGroup.Item>
                        );
                     })}
                  </ListGroup>
               )}
            </div>
            {addGroupModal.show && (
               <AddGroupToPresentationModal
                  show={addGroupModal.show}
                  setShow={addGroupModal.setShow}
                  data={addGroupModal.data}
                  setData={addGroupModal.setData}
                  handleSubmitAddGroupModal={handleAddGroup}
                  existedGroupIds={presentationManageStore.state.groups?.map(
                     (group, index) => group.groupId
                  )}
               />
            )}
            {deleteGroupModal.show && (
               <DeleteModal
                  title={"Delete group"}
                  show={deleteGroupModal.show}
                  setShow={deleteGroupModal.setShow}
                  data={deleteGroupModal.data}
                  setData={deleteGroupModal.setData}
                  handleSubmitForm={handleDeleteGroup}
               />
            )}
            l
         </div>
      )
   );
}

export default PresentationManageGroup;
