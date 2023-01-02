import { faAdd, faEdit, faPlayCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import dateFormat from "date-and-time";

import Button from "../../../components/Button";
import CreatePresentationModal from "./components/CreatePresentationModal";
import { usePresentationStore } from "./store";
import ActionMenu from "./components/ActionMenu";

import RenamePresentationModal from "./components/RenamePresentationModal";
import InviteToPresentationModal from "./components/InviteToPresentationModal";
import Modal from "../../../components/Modal";

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
import styles from "./PresentationPage.module.scss";
const cx = classNames.bind(styles);

function PresentationPage() {
   const presentationStore = usePresentationStore();

   const { handleUpdateRecentSideBarMenuBottomItems } = usePresenationManageLayoutStore();

   const { isSelectAll, selectedRowIds, handleSelectedAll, handleSelected, setRowIds } =
      useTableSelect([]);

   // show/hide modal state
   const { createModal, renameModal, deleteModal, inviteModal } = presentationStore;

   // responsive
   const isDesktop = useMediaQuery({ minWidth: 992 });
   const isMobile = useMediaQuery({ maxWidth: 767 });
   const isNotMobile = useMediaQuery({ minWidth: 768 });

   useEffect(() => {
      // load data
      const loadData = async () => {
         const data = await presentationStore.method.loadPresentations();
         if (data) {
            const { presentations } = data;

            setRowIds((prev) => {
               return presentations?.map((presentation) => presentation?.id);
            });
         }

         presentationStore.method.setInit();
      };
      loadData();
   }, []);

   const handleDeletePresentation = async () => {
      await presentationStore.method.deletePresentation(deleteModal?.data);

      console.log("presentationStore deleteModal.data: ", deleteModal?.data);
      deleteModal.setShow(false);
      deleteModal.setData(null);
   };

   return (
      presentationStore.state.isInit && (
         <div
            className={cx("wrapper", {
               isMobile
            })}
         >
            <div className={cx("container")}>
               <div className={cx("header")}>
                  <h1 className={cx("title")}>My Presentations</h1>
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
                           title="Create"
                           basicBlue
                           big
                           rounded
                           className={cx("btn")}
                           leftIcon={<FontAwesomeIcon icon={faAdd} size="1x" />}
                           onClick={() => {
                              createModal.setShow(true);
                           }}
                        />
                     </div>
                  </div>
               </div>

               {isNotMobile ? (
                  <Table>
                     <TableTHead>
                        <TableTr>
                           <TableTh>
                              <input
                                 type={"checkbox"}
                                 checked={isSelectAll}
                                 onChange={handleSelectedAll}
                                 className={cx("checkbox")}
                              />
                           </TableTh>
                           <TableTh>id</TableTh>
                           <TableTh>Name</TableTh>
                           <TableTh>Code</TableTh>
                           <TableTh>Owner</TableTh>
                           {isDesktop && (
                              <>
                                 <TableTh>Modified</TableTh>
                                 <TableTh>Created</TableTh>
                              </>
                           )}
                           <TableTh>Edit</TableTh>
                           <TableTh></TableTh>
                        </TableTr>
                     </TableTHead>
                     <TableTBody>
                        {presentationStore.state.presentations?.map((presentation, index) => {
                           const isChecked = selectedRowIds?.includes(presentation.id);
                           return (
                              <TableTr key={index}>
                                 <TableTd>
                                    <input
                                       type={"checkbox"}
                                       checked={isChecked}
                                       onChange={() => handleSelected(presentation.id, isChecked)}
                                       className={cx("checkbox")}
                                    />
                                 </TableTd>
                                 <TableTd>{presentation?.id}</TableTd>
                                 <TableTd>
                                    <div className={cx("presentation-infor-cell")}>
                                       <Link to={`/presentation/${presentation.id}/play`}>
                                          <FontAwesomeIcon
                                             icon={faPlayCircle}
                                             size="1x"
                                             className={cx("icon")}
                                          />
                                       </Link>
                                       <Link
                                          to={`/presentation/${presentation.id}/user`}
                                          onClick={() => {
                                             handleUpdateRecentSideBarMenuBottomItems(presentation);
                                          }}
                                       >
                                          {presentation?.name}
                                       </Link>
                                    </div>
                                 </TableTd>
                                 <TableTd>{presentation?.code}</TableTd>
                                 <TableTd>Me</TableTd>

                                 {isDesktop && (
                                    <>
                                       <TableTd>
                                          {dateFormat.format(
                                             new Date(presentation?.createdAt),
                                             "DD/MM/YYYY HH:mm"
                                          )}
                                       </TableTd>
                                       <TableTd>
                                          {dateFormat.format(
                                             new Date(presentation?.updatedAt),
                                             "DD/MM/YYYY HH:mm"
                                          )}
                                       </TableTd>
                                    </>
                                 )}
                                 <TableTd>
                                    <Link to={`/presentation/${presentation.id}/edit`}>
                                       <FontAwesomeIcon
                                          icon={faEdit}
                                          size="1x"
                                          className={cx("icon")}
                                       />
                                    </Link>
                                 </TableTd>

                                 <TableTd>
                                    <ActionMenu id={presentation.id} />
                                 </TableTd>
                              </TableTr>
                           );
                        })}
                     </TableTBody>
                  </Table>
               ) : (
                  <ListGroup className={cx("list")}>
                     {presentationStore.state.presentations?.map((presentation, index) => {
                        return (
                           <ListGroup.Item className={cx("item")} key={index}>
                              <div className={cx("top")}>
                                 <div className={cx("infor")}>
                                    <Link to={`/presentation/${presentation.id}/play`}>
                                       <FontAwesomeIcon
                                          icon={faPlayCircle}
                                          size="1x"
                                          className={cx("icon")}
                                       />
                                    </Link>

                                    <Link
                                       to={`/presentation/${presentation.id}/user`}
                                       onClick={() => {
                                          handleUpdateRecentSideBarMenuBottomItems(presentation);
                                       }}
                                    >
                                       {presentation?.name}
                                    </Link>
                                 </div>

                                 <div className={cx("action")}>
                                    <Link to={`/presentation/${presentation.id}/edit`}>
                                       <FontAwesomeIcon
                                          icon={faEdit}
                                          size="1x"
                                          className={cx("icon")}
                                       />
                                    </Link>
                                    <ActionMenu id={presentation.id} />
                                 </div>
                              </div>
                              <div className={cx("bottom")}>
                                 <span className={cx("onwer")}>me</span>
                              </div>
                           </ListGroup.Item>
                        );
                     })}
                  </ListGroup>
               )}
            </div>

            {createModal.show && (
               <CreatePresentationModal
                  show={createModal.show}
                  setShow={createModal.setShow}
                  data={createModal.data}
                  setData={createModal.setData}
               />
            )}
            {renameModal.show && (
               <RenamePresentationModal
                  show={renameModal.show}
                  setShow={renameModal.setShow}
                  data={renameModal.data}
                  setData={renameModal.setData}
               />
            )}
            {inviteModal.show && (
               <InviteToPresentationModal
                  show={inviteModal.show}
                  setShow={inviteModal.setShow}
                  data={inviteModal.data}
                  setData={inviteModal.setData}
               />
            )}
            {deleteModal.show && (
               <Modal
                  title={"Delete Presentation"}
                  haveSubmitBtn
                  submitBtnTitle={"Delete"}
                  onSubmitModal={handleDeletePresentation}
                  show={deleteModal.show}
                  setShow={deleteModal.setShow}
               />
            )}
         </div>
      )
   );
}

export default PresentationPage;
