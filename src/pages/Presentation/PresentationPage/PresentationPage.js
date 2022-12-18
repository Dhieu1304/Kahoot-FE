import { faAdd, faL, faPlayCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import CreatePresentationModal from "./components/CreateGroupModal/CreatePresentationModal";
import styles from "./PresentationPage.module.scss";
import { usePresentationStore } from "./store";
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

   return (
      <div className={cx("wrapper")}>
         <Container>
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
               <Table responsive className={cx("table")}>
                  <thead>
                     <tr className={cx("tr")}>
                        <th className={cx("th")}>
                           <input
                              type={"checkbox"}
                              checked={isSelectAll}
                              onClick={() => {
                                 if (isSelectAll) {
                                    setSelectedRowIds([]);
                                 } else {
                                    setSelectedRowIds((prev) => {
                                       const newSelectedRowIds =
                                          presentationStore.state.presentations.map(
                                             (presentation) => presentation.id
                                          );
                                       return [...newSelectedRowIds];
                                    });
                                 }

                                 setIsSelectAll((prev) => !prev);
                              }}
                           />
                        </th>
                        <th className={cx("th")}>id</th>
                        <th className={cx("th")}>Name</th>
                        <th className={cx("th")}>Code</th>
                        <th className={cx("th")}>Owner</th>
                        <th className={cx("th")}>Modified</th>
                        <th className={cx("th")}>Created</th>
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
                                    onClick={() => {
                                       setSelectedRowIds((prev) => {
                                          const newSelectedRowIds = [...prev];
                                          if (isChecked) {
                                             const index = newSelectedRowIds.indexOf(
                                                presentation.id
                                             );
                                             newSelectedRowIds.splice(index, 1);
                                          } else {
                                             newSelectedRowIds.push(presentation.id);
                                          }
                                          return [...newSelectedRowIds];
                                       });
                                       if (isChecked) {
                                          setIsSelectAll(false);
                                       }
                                    }}
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
                              <td className={cx("td")}>{presentation?.createdAt}</td>
                              <td className={cx("td")}>{presentation?.updatedAt}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </Table>
            ) : (
               <div></div>
            )}
         </Container>

         <CreatePresentationModal show={showCreateModal} setShow={setShowCreateModal} />
      </div>
   );
}

export default PresentationPage;
