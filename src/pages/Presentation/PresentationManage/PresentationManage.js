import { faAdd, faEdit, faPlayCircle, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
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
import InviteToPresentationModal from "../components/InviteToPresentationModal";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth";
const cx = classNames.bind(styles);

function PresentationManage() {
   const presentationManageStore = usePresentationManageStore();

   console.log("presentationManageStore: ", presentationManageStore);
   const authContext = useContext(AuthContext);

   const { renameModal, deleteModal, inviteModal } = presentationManageStore;

   const { isSelectAll, selectedRowIds, handleSelectedAll, handleSelected, setRowIds } =
      useTableSelect([]);

   // show/hide modal state
   const { createModal } = usePresenationManageLayoutStore();

   // responsive
   const isDesktop = useMediaQuery({ minWidth: 992 });
   const isMobile = useMediaQuery({ maxWidth: 767 });
   const isNotMobile = useMediaQuery({ minWidth: 768 });

   const location = useLocation();
   const presentationId = location.pathname.split("/presentation/")[1].split("/")[0];

   useEffect(() => {
      // load data
      const loadData = async () => {
         const data = await presentationManageStore.method.loadPresentationDetail(presentationId);
         if (data) {
            const { presentations } = data;
            setRowIds((prev) => {
               return presentations?.map((presentation) => presentation?.id);
            });
         }
         presentationManageStore.method.setInit();
      };
      loadData();
   }, []);

   const handleInviteByEmail = async ({ email }) => {
      console.log("handleInviteByEmail: ");
      console.log("data: ", inviteModal.data);
      console.log("email: ", email);
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
                  <h1 className={cx("title")}>
                     {presentationManageStore.state.presentation?.name}
                  </h1>
                  <div className={cx("nav")}>
                     <div className={cx("btn-group")}>
                        {selectedRowIds.length > 0 && isNotMobile && (
                           <Button
                              title="Remove"
                              basicRed
                              big
                              rounded
                              className={cx("btn")}
                              leftIcon={<FontAwesomeIcon icon={faX} size="1x" />}
                              // onClick={() => {

                              // }}
                           />
                        )}

                        <Button
                           title="Invite"
                           basicBlue
                           big
                           rounded
                           className={cx("btn")}
                           leftIcon={<FontAwesomeIcon icon={faAdd} size="1x" />}
                           onClick={() => {
                              inviteModal.setData(presentationId);
                              inviteModal.setShow(true);
                           }}
                        />
                     </div>
                  </div>
               </div>

               {isNotMobile ? (
                  <Table>
                     <TableTHead>
                        <TableTr>
                           {
                              // authContext.user?.id === presentationManageStore.state.presentation?.owner?.id
                              true && (
                                 <TableTh>
                                    <input
                                       type={"checkbox"}
                                       checked={isSelectAll}
                                       onChange={handleSelectedAll}
                                       className={cx("checkbox")}
                                    />
                                 </TableTh>
                              )
                           }

                           <TableTh>Id</TableTh>
                           <TableTh>Name</TableTh>
                           <TableTh>Role</TableTh>
                           {
                              // authContext.user?.id === presentationManageStore.state.presentation?.owner?.id
                              true && <TableTh></TableTh>
                           }
                        </TableTr>
                     </TableTHead>
                     <TableTBody>
                        {presentationManageStore.state.users?.map((user, index) => {
                           const isChecked = selectedRowIds?.includes(user.id);
                           return (
                              <TableTr key={index}>
                                 {
                                    // authContext.user?.id === presentationManageStore.state.presentation?.owner?.id
                                    true && (
                                       <TableTd>
                                          {authContext.user?.id !== user?.id && (
                                             <input
                                                type={"checkbox"}
                                                checked={isChecked}
                                                onChange={() => handleSelected(user?.id, isChecked)}
                                                className={cx("checkbox")}
                                             />
                                          )}
                                       </TableTd>
                                    )
                                 }
                                 <TableTd>{user?.id}</TableTd>
                                 <TableTd>
                                    <div className={cx("presentation-infor-cell")}>
                                       {user?.name}
                                    </div>
                                 </TableTd>
                                 <TableTd>{user?.role}</TableTd>

                                 {
                                    // authContext.user?.id === presentationManageStore.state.presentation?.owner?.id
                                    true && (
                                       <TableTd>
                                          <FontAwesomeIcon icon={faTrash} size="1x" color="red" />
                                       </TableTd>
                                    )
                                 }
                              </TableTr>
                           );
                        })}
                     </TableTBody>
                  </Table>
               ) : (
                  <ListGroup className={cx("list")}>
                     {presentationManageStore.state.users?.map((user, index) => {
                        return (
                           <ListGroup.Item className={cx("item")} key={index}>
                              <div className={cx("top")}>
                                 <div className={cx("infor")}>{user?.name}</div>

                                 <div className={cx("action")}>
                                    {
                                       // authContext.user?.id === presentationManageStore.state.presentation?.owner?.id
                                       true && (
                                          <FontAwesomeIcon icon={faTrash} size="1x" color="red" />
                                       )
                                    }
                                 </div>
                              </div>
                              <div className={cx("bottom")}>
                                 <span className={cx("role")}>{user?.role}</span>
                              </div>
                           </ListGroup.Item>
                        );
                     })}
                  </ListGroup>
               )}
            </div>

            {inviteModal.show && (
               <InviteToPresentationModal
                  show={inviteModal.show}
                  setShow={inviteModal.setShow}
                  data={inviteModal.data}
                  setData={inviteModal.setData}
                  handleInviteByEmail={handleInviteByEmail}
               />
            )}
         </div>
      )
   );
}

export default PresentationManage;
