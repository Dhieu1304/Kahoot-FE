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
import { useParams } from "react-router-dom";
import Modal from "../../../../../components/Modal";
import { useAuthStore } from "../../../../../providers/auth";
import presentationServices from "../../../../../services/presentationServices";
import { getItem, LOCAL_STORAGE } from "../../../../../utils/localStorage";

import styles from "./QuestionModal.module.scss";
const cx = classNames.bind(styles);

function QuestionModal({ show, setShow, questionList }) {
   // console.log("questionList: ", {
   //    show,
   //    setShow,
   //    questionList
   // });

   const authStore = useAuthStore();
   const userId = authStore.user?.id;
   const uid = getItem(LOCAL_STORAGE.UUID);

   const [isLiked, setIsLike] = useState(false);
   const params = useParams();

   const handleUpVote = async (questionId) => {
      const presentationId = params.id;
      // const result = presentationServices.handleUpVote(userId, uid, presentationId, questionId);
      // setIsLike((prev) => !prev);
   };

   const handleDownVote = async (questionId) => {
      const presentationId = params.id;
      // const result = presentationServices.handleDownVote(userId, uid, presentationId, questionId);
      // setIsLike((prev) => !prev);
   };

   return (
      <Modal title={"Question"} show={show} setShow={setShow} hideCancel>
         <div className={cx("container")}>
            <div className={cx("list")}>
               {questionList.map((question, index) => (
                  <div key={index} className={cx("item")}>
                     <div className={cx("content")}>
                        <span className={cx("question")}>{question?.question}</span>

                        <span className={cx("user-fullname")}>{question?.user?.fullName}</span>
                     </div>

                     {question?.vote_by?.includes(userId) || question?.vote_by?.includes(uid) ? (
                        <FontAwesomeIcon
                           size="1x"
                           icon={faThumbsUp}
                           className={cx("liked-icon")}
                           onClick={() => handleDownVote(question?.id)}
                        />
                     ) : (
                        <FontAwesomeIcon
                           size="1x"
                           icon={faThumbsUp}
                           // className={cx("like-icon")}
                           onClick={() => handleUpVote(question?.id)}
                        />
                     )}
                  </div>
               ))}
            </div>
         </div>
      </Modal>
   );
}

export default QuestionModal;
