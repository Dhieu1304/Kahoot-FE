import { faAdd, faPlayCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import CreatePresentationModal from "./components/CreateGroupModal/CreatePresentationModal";
import styles from "./PresentationPage.module.scss";
import { usePresentationStore } from "./store";
const cx = classNames.bind(styles);

function PresentationPage() {
   const presentationStore = usePresentationStore();

   const [showCreateModal, setShowCreateModal] = useState(false);

   useEffect(() => {
      const loadData = async () => {
         presentationStore.method.loadPresentations();
      };

      loadData();
   }, []);

   console.log("presentationStore.state.presentations: ", presentationStore.state.presentations);
   console.log("showCreateModal: ", showCreateModal);

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
            <Table responsive className={cx("table")}>
               <thead>
                  <tr className={cx("tr")}>
                     <th className={cx("th")}>Name</th>
                     <th className={cx("th")}>Owner</th>
                     <th className={cx("th")}>Code</th>
                  </tr>
               </thead>
               <tbody>
                  {presentationStore.state.presentations?.map((presentation, index) => {
                     return (
                        <tr className={cx("tr")} key={index}>
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
                           <td className={cx("td")}>Me</td>
                           <td className={cx("td")}>{presentation?.code}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </Table>
         </Container>

         <CreatePresentationModal show={showCreateModal} setShow={setShowCreateModal} />
      </div>
   );
}

export default PresentationPage;
