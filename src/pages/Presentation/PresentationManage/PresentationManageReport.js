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
import formatDate from "date-and-time";

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
import InviteToPresentationModal from "../components/InviteToPresentationModal";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth";
import Tabs from "../../../components/Tabs";
import DeleteModal from "../components/DeleteModal";
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

function PresentationManageReport() {
   const presentationManageStore = usePresentationManageStore();

   console.log("presentationManageStore: ", presentationManageStore);
   const authContext = useContext(AuthContext);

   const { renameModal, deletePresentationModal, deleteMemberModal, inviteModal } =
      presentationManageStore;

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
                           <TableTh>Slide</TableTh>
                           <TableTh>Option</TableTh>
                           <TableTh>User name</TableTh>
                           <TableTh>Created At</TableTh>
                        </TableTr>
                     </TableTHead>
                     <TableTBody>
                        {presentationManageStore.state.reports?.map((report, index) => {
                           const date = new Date(report?.createAt);
                           return (
                              <TableTr key={index}>
                                 <TableTd>{report?.id}</TableTd>
                                 <TableTd>{report?.ordinalSlideNumber}</TableTd>
                                 <TableTd>{report?.name}</TableTd>
                                 <TableTd>{report?.user?.fullName}</TableTd>
                                 <TableTd>
                                    {formatDate.format(
                                       new Date(report?.createdAt),
                                       "DD/MM/YYYY - HH:mm:ss"
                                    )}
                                 </TableTd>
                              </TableTr>
                           );
                        })}
                     </TableTBody>
                  </Table>
               ) : (
                  <ListGroup className={cx("list")}>
                     {presentationManageStore.state.presentation?.presentationMembers?.map(
                        (member, index) => {
                           return (
                              <ListGroup.Item className={cx("item")} key={index}>
                                 <div className={cx("top")}>
                                    <div className={cx("infor")}>{member?.user?.fullName}</div>

                                    <div className={cx("action")}>
                                       {authContext.user?.id ===
                                          presentationManageStore.state.presentation?.owner?.id &&
                                          authContext.user?.id !== member?.userId && (
                                             <FontAwesomeIcon
                                                icon={faTrash}
                                                className={cx("icon")}
                                                size="1x"
                                                color="red"
                                                onClick={() => {
                                                   deleteMemberModal.setData(member?.userId);
                                                   deleteMemberModal.setShow(true);
                                                }}
                                             />
                                          )}
                                    </div>
                                 </div>
                                 <div className={cx("bottom")}>
                                    <span className={cx("role")}>{member?.role?.name}</span>
                                 </div>
                              </ListGroup.Item>
                           );
                        }
                     )}
                  </ListGroup>
               )}
            </div>
         </div>
      )
   );
}

export default PresentationManageReport;
