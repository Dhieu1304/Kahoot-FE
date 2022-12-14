import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
   faDroplet,
   faGear,
   faPlus,
   faUpload,
   faArrowLeft,
   faPresentationScreen,
   faPlay,
   faSave
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import Button from "../../../../../components/Button";
import { useCallback, useContext, useState } from "react";
import CreateSlideModal from "../CreateSlideModal";
import ChangeThemeModal from "../ChangeThemeModal";
import { useNavigate } from "react-router-dom";

import { usePresentationDetailStore } from "../../store";
import Modal from "../../../../../components/Modal";
import { SocketContext } from "../../../../../providers/socket";
import { PRESENTATION_EVENT } from "../../../../../providers/socket/socket.constant";

const cx = classNames.bind(styles);

function Header() {
   const presentationDetailStore = usePresentationDetailStore();
   const socket = useContext(SocketContext);
   console.log("presentationDetailStore.state header: ", presentationDetailStore.state);

   const [showCreateSlideModal, setShowCreateSlideModal] = useState(false);
   const [showChangeThemModal, setShowChangeThemModal] = useState(false);
   const [showSaveModal, setShowSaveModal] = useState(false);

   const navigate = useNavigate();

   const handlePresent = useCallback((presentation_id, ordinal_slide_number) => {
      socket.emit(PRESENTATION_EVENT.PRESENT, { presentation_id, ordinal_slide_number });
   }, []);

   return (
      <div className={cx("container")}>
         <div className={cx("left")}>
            <Button
               title={"Back"}
               outline
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
               onClick={() => {
                  navigate("/presentation");
               }}
            />
            <Button
               title={"New slide"}
               basicBlue
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faPlus} />}
               onClick={() => {
                  setShowCreateSlideModal(true);
               }}
            />
         </div>
         <div className={cx("right")}>
            <Button
               title={"Play"}
               basicTeal
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faPlay} />}
               onClick={() => {
                  const presentationId = presentationDetailStore.state.presentation?.id;
                  const slideId = 1;
                  handlePresent(presentationId, slideId);
                  navigate(`/presentation/${presentationId}/${slideId}`);
               }}
            />
            <Button
               title={"Themes"}
               basicTeal
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faDroplet} />}
               onClick={() => {
                  setShowChangeThemModal(true);
               }}
            />
            <Button
               title={"Save"}
               basicYellow
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faSave} />}
               onClick={() => {
                  setShowSaveModal(true);
               }}
            />
         </div>
         <CreateSlideModal show={showCreateSlideModal} setShow={setShowCreateSlideModal} />
         <ChangeThemeModal show={showChangeThemModal} setShow={setShowChangeThemModal} />
         <Modal
            title={"Save Presentation"}
            show={showSaveModal}
            setShow={setShowSaveModal}
            haveSubmitBtn
            onSubmitModal={async () => {
               await presentationDetailStore.method.save();
            }}
            submitBtnTitle={"Save"}
         ></Modal>
      </div>
   );
}

export default Header;
