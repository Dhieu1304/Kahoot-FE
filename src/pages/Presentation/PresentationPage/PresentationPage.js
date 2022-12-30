import { faAdd, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ListGroup, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
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

const cx = classNames.bind(styles);

function PresentationPage() {
   const presentationStore = usePresentationStore();

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
                     <div className={cx("filters")}>
                        <Select
                           defaultValue={limit}
                           placeholder="limit"
                           onChange={setLimit}
                           options={limitOptions}
                           className={cx("limit")}
                           isSearchable={false}
                        />
                        <Select
                           defaultValue={selectedOption}
                           onChange={setSelectedOption}
                           options={selectOptions}
                           className={cx("select")}
                           isSearchable={false}
                        />
                     </div>
                  </div>
               </div>

               {isNotMobile ? (
                  <Table className={cx("table")}>
                     <thead className={cx("thead")}>
                        <tr className={cx("tr")}>
                           <th className={cx("th")}>
                              <input
                                 type={"checkbox"}
                                 checked={isSelectAll}
                                 onChange={handleSelectedAll}
                                 className={cx("checkbox")}
                              />
                           </th>
                           <th className={cx("th")}>id</th>
                           <th className={cx("th")}>Name</th>
                           <th className={cx("th")}>Code</th>
                           <th className={cx("th")}>Owner</th>

                           {isDesktop && (
                              <>
                                 <th className={cx("th")}>Modified</th>
                                 <th className={cx("th")}>Created</th>
                              </>
                           )}
                           <th className={cx("th")}></th>
                        </tr>
                     </thead>
                     <tbody className={cx("tbody")}>
                        {presentationStore.state.presentations?.map((presentation, index) => {
                           const isChecked = selectedRowIds.includes(presentation.id);
                           return (
                              <tr className={cx("tr")} key={index}>
                                 <td className={cx("td")}>
                                    <input
                                       type={"checkbox"}
                                       checked={isChecked}
                                       onChange={() => handleSelected(presentation.id, isChecked)}
                                       className={cx("checkbox")}
                                    />
                                 </td>
                                 <td className={cx("td")}>{presentation?.id}</td>
                                 <td className={cx("td")}>
                                    <div className={cx("presentation-infor-cell")}>
                                       <Link to={`${presentation.id}/1`}>
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
                                 </td>
                                 <td className={cx("td")}>{presentation?.code}</td>
                                 <td className={cx("td")}>Me</td>

                                 {isDesktop && (
                                    <>
                                       <td className={cx("td")}>
                                          {dateFormat.format(
                                             new Date(presentation?.createdAt),
                                             "DD/MM/YYYY HH:mm"
                                          )}
                                       </td>
                                       <td className={cx("td")}>
                                          {dateFormat.format(
                                             new Date(presentation?.updatedAt),
                                             "DD/MM/YYYY HH:mm"
                                          )}
                                       </td>
                                    </>
                                 )}
                                 <td className={cx("td")}>
                                    <ActionMenu id={presentation.id} />
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
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
