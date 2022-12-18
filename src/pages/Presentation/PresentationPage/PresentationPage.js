import {
   faAdd,
   faEdit,
   faEllipsis,
   faEllipsisVertical,
   faL,
   faPlayCircle,
   faX
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Dropdown, ListGroup, Table } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import dateFormat from "date-and-time";

import Button from "../../../components/Button";
import CreatePresentationModal from "./components/CreateGroupModal/CreatePresentationModal";
import styles from "./PresentationPage.module.scss";
import { usePresentationStore } from "./store";
import CustomToggleDropdownBtn from "../../../components/CustomToggleDropdownBtn";
import ActionMenu from "./components/ActionMenu";
const cx = classNames.bind(styles);

function PresentationPage() {
   const presentationStore = usePresentationStore();

   const [showCreateModal, setShowCreateModal] = useState(false);

   const [isSelectAll, setIsSelectAll] = useState(false);
   const [selectedRowIds, setSelectedRowIds] = useState([]);

   const isDesktop = useMediaQuery({ minWidth: 992 });
   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
   const isMobile = useMediaQuery({ maxWidth: 767 });
   const isNotMobile = useMediaQuery({ minWidth: 768 });

   useEffect(() => {
      const loadData = async () => {
         presentationStore.method.loadPresentations();
      };

      loadData();
   }, []);

   // console.log("presentationStore.state.presentations: ", presentationStore.state.presentations);
   // console.log("selectedRowIds: ", selectedRowIds);

   const handleSelectedAll = () => {
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

   const handleSelected = (id, isChecked) => {
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
      if (isChecked) {
         setIsSelectAll(false);
      }
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <div className={cx("header")}>
               <h1 className={cx("title")}>My Presentations</h1>
               <div>
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
               <Table className={cx("table")}>
                  <thead>
                     <tr className={cx("tr")}>
                        <th className={cx("th")}>
                           <input
                              type={"checkbox"}
                              checked={isSelectAll}
                              onClick={handleSelectedAll}
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
                     </tr>
                  </thead>
                  <tbody>
                     {presentationStore.state.presentations?.map((presentation, index) => {
                        const isChecked = selectedRowIds.includes(presentation.id);
                        return (
                           <tr className={cx("tr")} key={index}>
                              <td className={cx("td")}>
                                 <input
                                    type={"checkbox"}
                                    checked={isChecked}
                                    onClick={() => handleSelected(presentation.id, isChecked)}
                                 />
                              </td>
                              <td className={cx("td")}>{presentation?.id}</td>
                              <td className={cx("td", "presentation-infor-col")}>
                                 <Link to={`${presentation.id}/1`}>
                                    <FontAwesomeIcon
                                       icon={faPlayCircle}
                                       size="1x"
                                       className={cx("icon")}
                                    />
                                 </Link>
                                 <Link to={`${presentation.id}/1/edit`}>{presentation?.name}</Link>
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
                                       {" "}
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
                                 <Link to={`${presentation.id}/1/edit`}>{presentation?.name}</Link>
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
      </div>
   );
}

export default PresentationPage;
