import { faAdd, faEdit, faPlayCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import dateFormat from "date-and-time";
import Button from "../../../components/Button";
import CreatePresentationModal from "../components/CreatePresentationModal";
import { usePresentationStore } from "./store";
import ActionMenu from "./components/ActionMenu";
import RenamePresentationModal from "../components/RenamePresentationModal";
import InviteToPresentationModal from "../components/InviteToPresentationModal";

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
import DeleteModal from "../components/DeleteModal";
import presentationServices from "../../../services/presentationServices";
import ChangePresentationTypeModal from "../components/ChangePresentationTypeModal";
const cx = classNames.bind(styles);

function PresentationPage() {
   const presentationStore = usePresentationStore();

   const { handleUpdateRecentSideBarMenuBottomItems } = usePresenationManageLayoutStore();

   const { isSelectAll, selectedRowIds, handleSelectedAll, handleSelected, setRowIds } =
      useTableSelect([]);

   // show/hide modal state
   const { createModal, renameModal, deleteModal, inviteModal, changePresentationTypeModal } =
      presentationStore;

   // responsive
   const isDesktop = useMediaQuery({ minWidth: 992 });
   const isMobile = useMediaQuery({ maxWidth: 767 });
   const isNotMobile = useMediaQuery({ minWidth: 768 });

   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      // load data
      const loadData = async () => {
         // console.log("location: ", location);
         const pathname = location.pathname;
         let presentations = null;
         switch (pathname) {
            case "/presentation/owned":
               presentations = await presentationStore.method.initPresentations("OWNER");
               break;
            case "/presentation/joined":
               presentations = await presentationStore.method.initPresentations("CO_OWNER");
               break;
            default:
               break;
         }

         if (presentations) {
            setRowIds((prev) => {
               return presentations?.map((presentation) => presentation?.id);
            });
         }

         presentationStore.method.setInit();
      };
      loadData();
   }, [location]);

   const handleSubmitCreateModal = async ({ name, groups, type }) => {
      console.log("handleSubmitCreateModal: ", { name, groups, type });

      const presentation = await presentationServices.createPresentation(name, groups, type);

      if (presentation) navigate(`/presentation/${presentation?.id}/edit`);
   };

   const handleSubmitRenameModal = async ({ name, groups, type }) => {
      console.log("handleSubmitRenameModal: ", { name });
      const presentationId = renameModal.data;
      const presentations = await presentationStore.method.renamePresentation(presentationId, name);
   };

   const handleInviteByEmail = async ({ email }) => {
      console.log("handleInviteByEmail: ", { email });
      const presentationId = inviteModal.data;
      const result = await presentationStore.method.addPresentationCoOwner(presentationId, email);
   };

   const handleDeletePresentation = async () => {
      const result = await presentationStore.method.deletePresentation(deleteModal?.data);
      console.log("presentationStore deleteModal.data: ", deleteModal?.data);

      if (result) navigate("/presentation");
   };

   const handleChangePresentationType = async () => {
      const { id, presentationTypeId } = changePresentationTypeModal?.data;

      const newPresentationTypeId = presentationTypeId === 1 ? 2 : 1;

      const result = await presentationStore.method.changePresentationType(
         id,
         newPresentationTypeId
      );
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
                           <TableTh textAlign={"center"}>Edit slides</TableTh>
                           <TableTh></TableTh>
                        </TableTr>
                     </TableTHead>
                     <TableTBody>
                        {presentationStore.state.presentations?.map((presentation, index) => {
                           return (
                              <TableTr key={index}>
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
                                          to={`/presentation/${presentation.id}/edit`}
                                          onClick={() => {
                                             handleUpdateRecentSideBarMenuBottomItems(presentation);
                                          }}
                                       >
                                          {presentation?.name}
                                       </Link>
                                    </div>
                                 </TableTd>
                                 <TableTd>{presentation?.code}</TableTd>
                                 <TableTd>{presentation?.owner?.fullName}</TableTd>

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
                                 <TableTd textAlign={"center"}>
                                    <Link to={`/presentation/${presentation.id}/edit`}>
                                       <FontAwesomeIcon
                                          icon={faEdit}
                                          size="1x"
                                          className={cx("icon")}
                                       />
                                    </Link>
                                 </TableTd>

                                 <TableTd>
                                    <ActionMenu data={presentation} />
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
                  handleSubmitCreateModal={handleSubmitCreateModal}
               />
            )}
            {renameModal.show && (
               <RenamePresentationModal
                  show={renameModal.show}
                  setShow={renameModal.setShow}
                  data={renameModal.data}
                  setData={renameModal.setData}
                  handleSubmitRenameModal={handleSubmitRenameModal}
               />
            )}
            {inviteModal.show && (
               <InviteToPresentationModal
                  show={inviteModal.show}
                  setShow={inviteModal.setShow}
                  data={inviteModal.data}
                  setData={inviteModal.setData}
                  handleInviteByEmail={handleInviteByEmail}
               />
            )}
            {deleteModal.show && (
               <DeleteModal
                  show={deleteModal.show}
                  setShow={deleteModal.setShow}
                  data={deleteModal.data}
                  setData={deleteModal.setData}
                  handleSubmitForm={handleDeletePresentation}
               />
            )}

            {changePresentationTypeModal.show && (
               <ChangePresentationTypeModal
                  show={changePresentationTypeModal.show}
                  setShow={changePresentationTypeModal.setShow}
                  data={changePresentationTypeModal.data}
                  setData={changePresentationTypeModal.setData}
                  handleSubmitForm={handleChangePresentationType}
               />
            )}
         </div>
      )
   );
}

export default PresentationPage;
