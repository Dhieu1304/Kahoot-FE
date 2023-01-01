import { faAdd, faPlayCircle, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ListGroup, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import dateFormat from "date-and-time";

import Button from "../../../components/Button";
import CreatePresentationModal from "./components/CreatePresentationModal";
import styles from "./PresentationPage.module.scss";
import { usePresentationStore } from "./store";
import ActionMenu from "./components/ActionMenu";

import { limitOptions, selectOptions } from "./config";
import RenamePresentationModal from "./components/RenamePresentationModal";
import InviteToPresentationModal from "./components/InviteToPresentationModal";
import Modal from "../../../components/Modal";
import SideBar from "../../../components/SideBar/SideBar";
import { LOCAL_STORAGE } from "../../../utils/localStorage";
import useSideBar from "../../../components/SideBar/hooks";
import { useContext } from "react";
import { PresenationManageLayoutContext } from "../layout/PresenationManageLayout";
import Table from "../../../components/Table";
import TableTHead from "../../../components/Table/components/TableTHead";
import TableTr from "../../../components/Table/components/TableTr";
import TableTh from "../../../components/Table/components/TableTh";
import TableTd from "../../../components/Table/components/TableTd";
import TableTBody from "../../../components/Table/components/TableTBody";

const cx = classNames.bind(styles);

function PresentationPage() {
   const presentationStore = usePresentationStore();

   const navigate = useNavigate();

   // show/hide modal state
   const {
      showCreateModal,
      setShowCreateModal,
      showRenameModal,
      setShowRenameModal,
      showDeleteModal,
      setShowDeleteModal,
      showInviteModal,
      setShowInviteModal,
      selectedPresentationIdToAction,
      setSelectedPresentationIdToAction
   } = presentationStore;

   const { handleUpdateRecentSideBarMenuBottomItems } = useContext(PresenationManageLayoutContext);

   // filter state
   const [isSelectAll, setIsSelectAll] = useState(false);
   const [selectedRowIds, setSelectedRowIds] = useState([]);

   const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
   const [limit, setLimit] = useState(null);

   // responsive
   const isDesktop = useMediaQuery({ minWidth: 992 });
   const isMobile = useMediaQuery({ maxWidth: 767 });
   const isNotMobile = useMediaQuery({ minWidth: 768 });

   useEffect(() => {
      // load data
      const loadData = async () => {
         console.log("load data");
         presentationStore.method.loadPresentations();
         presentationStore.method.setInit();
      };
      loadData();
   }, []);

   // handle when select all rows
   const handleSelectedAll = () => {
      // if isSelectAll === true => clear setSelectedRowIds;
      // else checked all rows
      if (isSelectAll) {
         setSelectedRowIds([]);
      } else {
         setSelectedRowIds((prev) => {
            const newSelectedRowIds = presentationStore.state.presentations.map(
               (presentation) => presentation.id
            );
            return [...newSelectedRowIds];
         });
      }

      setIsSelectAll((prev) => !prev);
   };

   // handle when select 1 row
   const handleSelected = (id, isChecked) => {
      // handle checked row
      setSelectedRowIds((prev) => {
         const newSelectedRowIds = [...prev];
         if (isChecked) {
            const index = newSelectedRowIds.indexOf(id);
            newSelectedRowIds.splice(index, 1);
         } else {
            newSelectedRowIds.push(id);
         }
         return [...newSelectedRowIds];
      });

      // If current row is checked => after clicking this row, clear selectAll checkbox
      if (isChecked) {
         setIsSelectAll(false);
      }
   };

   const handleDeletePresentation = async () => {
      console.log("selectedPresentationIdToAction: ", selectedPresentationIdToAction);
      await presentationStore.method.deletePresentation(selectedPresentationIdToAction);

      setShowDeleteModal(false);
      setSelectedPresentationIdToAction(-1);
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
                              setShowCreateModal(true);
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
                           <TableTh>Too</TableTh>

                           {isDesktop && (
                              <>
                                 <TableTh>Modified</TableTh>
                                 <TableTh>Created</TableTh>
                              </>
                           )}
                           <TableTh></TableTh>
                        </TableTr>
                     </TableTHead>
                     <TableTBody>
                        {presentationStore.state.presentations?.map((presentation, index) => {
                           const isChecked = selectedRowIds.includes(presentation.id);
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
                                       <Link to={`${presentation.id}/edit`}>
                                          {presentation?.name}
                                       </Link>
                                    </div>
                                 </TableTd>
                                 <TableTd>{presentation?.code}</TableTd>
                                 <TableTd>Me</TableTd>
                                 <TableTd>
                                    <Button
                                       onClick={() => {
                                          handleUpdateRecentSideBarMenuBottomItems(presentation);
                                          navigate(`/presentation/${presentation?.id}/user`);
                                       }}
                                       title="XXX"
                                    />
                                 </TableTd>

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
                                    <Link to={`${presentation.id}/1`}>
                                       <FontAwesomeIcon
                                          icon={faPlayCircle}
                                          size="1x"
                                          className={cx("icon")}
                                       />
                                    </Link>

                                    <Link to={`${presentation.id}/edit`}>{presentation?.name}</Link>
                                 </div>
                                 <ActionMenu id={presentation.id} />
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

            <CreatePresentationModal show={showCreateModal} setShow={setShowCreateModal} />
            <RenamePresentationModal show={showRenameModal} setShow={setShowRenameModal} />
            <InviteToPresentationModal show={showInviteModal} setShow={setShowInviteModal} />
            <Modal
               title={"Delete Presentation"}
               haveSubmitBtn
               submitBtnTitle={"Delete"}
               onSubmitModal={handleDeletePresentation}
               show={showDeleteModal}
               setShow={setShowDeleteModal}
            />
         </div>
      )
   );
}

export default PresentationPage;
