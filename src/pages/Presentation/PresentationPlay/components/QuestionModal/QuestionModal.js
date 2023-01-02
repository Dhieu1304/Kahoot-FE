import {
   faArrowDown,
   faArrowsLeftRightToLine,
   faArrowUp,
   faPaperPlane,
   faPlay,
   faRightToBracket,
   faX
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Avatar from "../../../../../components/Avatar/Avatar";
import Button from "../../../../../components/Button";
import { AuthContext } from "../../../../../providers/auth";
import { usePresentationPlayStore } from "../../store";
import styles from "./QuestionModal.module.scss";
const cx = classNames.bind(styles);

function QuestionModal({ show, setShow, questionList }) {
   const authContext = useContext(AuthContext);
   const presentatioPlayStore = usePresentationPlayStore();

   const { setShowQuestionModal } = presentatioPlayStore;

   const [questionIndex, setQuestionIndex] = useState(0);
   const [answeredIndexList, setAnsweredIndexList] = useState([]);

   const handleAnswer = () => {
      setAnsweredIndexList((prev) => {
         const newAnsweredIndexList = [...prev];
         newAnsweredIndexList.push(questionIndex);
         return newAnsweredIndexList;
      });
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("container")}>
            <FontAwesomeIcon
               size="1x"
               icon={faX}
               className={cx("icon-x")}
               onClick={() => {
                  setShowQuestionModal(false);
               }}
            />

            <div className={cx("question")}>
               <FontAwesomeIcon
                  size="1x"
                  icon={faArrowUp}
                  onClick={() => {
                     if (questionIndex > 0) setQuestionIndex((index) => index - 1);
                  }}
               />
               {questionList && questionList.length > 0 ? (
                  <>
                     <div className={cx("page-number")}>
                        {questionIndex + 1} / {questionList.length}
                     </div>
                     <p className={cx("content")}>{questionList[questionIndex].content}</p>
                  </>
               ) : (
                  <span className={cx("no-question")}>No question</span>
               )}

               {answeredIndexList.includes(questionIndex) ? (
                  <div>
                     <Button title={"Answered"} big basicTeal rounded />
                  </div>
               ) : (
                  <div>
                     <Button
                        title={"Press to mark as answered"}
                        big
                        basicBlu
                        rounded
                        onClick={handleAnswer}
                     />
                  </div>
               )}

               <FontAwesomeIcon
                  size="1x"
                  icon={faArrowDown}
                  onClick={() => {
                     if (questionIndex < questionList.length - 1)
                        setQuestionIndex((index) => index + 1);
                  }}
               />
            </div>
         </div>
      </div>
   );
}

export default QuestionModal;