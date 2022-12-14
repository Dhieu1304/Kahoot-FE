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
   faSave,
   faRemove
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import Button from "../../../../../components/Button";
import { useState } from "react";
import CreateSlideModal from "../CreateSlideModal";
import ChangeThemeModal from "../ChangeThemeModal";
import { useNavigate } from "react-router-dom";

import { usePresentationDetailStore } from "../../store";
import Modal from "../../../../../components/Modal";

const cx = classNames.bind(styles);

function Header() {
   const presentationDetailStore = usePresentationDetailStore();

   const [showCreateSlideModal, setShowCreateSlideModal] = useState(false);
   const [showChangeThemModal, setShowChangeThemModal] = useState(false);
   const [showSaveModal, setShowSaveModal] = useState(false);
   const [showDeleteSlideModal, setShowDeleteSlideModal] = useState(false);

   const navigate = useNavigate();

   // console.log("PresentationDetailPage header: ", presentationDetailStore.state.presentation);
   // console.log("PresentationDetailPage header: ", presentationDetailStore.state.presentation.name);

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
            <input
               value={presentationDetailStore.state.presentation?.name}
               onChange={(e) => {
                  const val = e.target.value;

                  const presentation = { ...presentationDetailStore.state?.presentation };
                  presentation.name = val;
                  presentationDetailStore.method.changePresentation(presentation);
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
                  const presentationId = 1; //presentationDetailStore.state.presentation?.id;
                  const slideId = 1; // presentationDetailStore.state.currentSlide?.id;
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
            <Button
               title={"Remove"}
               basicRed
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faRemove} />}
               onClick={() => {
                  setShowDeleteSlideModal(true);
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
               setShowSaveModal(false);
               await presentationDetailStore.method.save();
            }}
            submitBtnTitle={"Save"}
         ></Modal>
         <Modal
            title={"Delete Slide"}
            show={showDeleteSlideModal}
            setShow={setShowDeleteSlideModal}
            haveSubmitBtn
            onSubmitModal={async () => {
               setShowSaveModal(false);
               await presentationDetailStore.method.delete();
            }}
            submitBtnTitle={"Delete"}
         ></Modal>
      </div>
   );
}

export default Header;
