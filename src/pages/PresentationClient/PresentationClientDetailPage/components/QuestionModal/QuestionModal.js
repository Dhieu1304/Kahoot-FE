import {
   faArrowDown,
   faArrowsLeftRightToLine,
   faArrowUp,
   faPaperPlane,
   faPlay,
   faRightToBracket,
   faThumbsUp,
   faX
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Avatar from "../../../../../components/Avatar/Avatar";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import { AuthContext } from "../../../../../providers/auth";
import { usePresentationClientDetailStore } from "../../store";

import styles from "./QuestionModal.module.scss";
const cx = classNames.bind(styles);

function QuestionModal({ show, setShow, questionList }) {
   const authContext = useContext(AuthContext);
   const presentationClientStore = usePresentationClientDetailStore();

   const { setShowQuestionModal } = presentationClientStore;

   const [questionIndex, setQuestionIndex] = useState(0);
   const [answeredIndexList, setAnsweredIndexList] = useState([]);

   console.log("questionList: ", {
      show,
      setShow,
      questionList
   });
   return (
      <Modal title={"Question"} show={show} setShow={setShow}>
         <div className={cx("container")}>
            <div className={cx("list")}>
               {questionList.map((question, index) => (
                  <div key={index} className={cx("item")}>
                     <span>{question?.content}</span>
                     <FontAwesomeIcon size="1x" icon={faThumbsUp} color="blue" />
                  </div>
               ))}
            </div>
         </div>
      </Modal>
   );
}

export default QuestionModal;
