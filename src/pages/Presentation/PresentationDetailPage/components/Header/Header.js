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
   faPlay
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import Button from "../../../../../components/Button";
import { useState } from "react";
import CreateSlideModal from "../CreateSlideModal";
import ChangeThemeModal from "../ChangeThemeModal";
import { useNavigate } from "react-router-dom";
import { usePresentationDetailStore } from "../../store";

const cx = classNames.bind(styles);

function Header() {
   const presentationDetailStore = usePresentationDetailStore();

   console.log("presentationDetailStore.state header: ", presentationDetailStore.state);

   const [showCreateSlideModal, setShowCreateSlideModal] = useState(false);
   const [showChangeThemModal, setShowChangeThemModal] = useState(false);

   const navigate = useNavigate();

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
                  const slideId = presentationDetailStore.state.currentSlide?.id;
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
               title={"Setting"}
               outline
               big
               rounded
               className={cx("btn")}
               leftIcon={<FontAwesomeIcon icon={faGear} />}
            />
         </div>
         <CreateSlideModal show={showCreateSlideModal} setShow={setShowCreateSlideModal} />
         <ChangeThemeModal show={showChangeThemModal} setShow={setShowChangeThemModal} />
      </div>
   );
}

export default Header;
