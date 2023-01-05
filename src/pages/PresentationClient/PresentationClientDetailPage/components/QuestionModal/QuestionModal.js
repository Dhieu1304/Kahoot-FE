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
import Modal from "../../../../../components/Modal";

import styles from "./QuestionModal.module.scss";
const cx = classNames.bind(styles);

function QuestionModal({ show, setShow, questionList }) {
   console.log("questionList: ", {
      show,
      setShow,
      questionList
   });

   const [isLiked, setIsLike] = useState(false);

   const handleLike = async () => {
      setIsLike((prev) => !prev);
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

                     {isLiked ? (
                        <FontAwesomeIcon
                           size="1x"
                           icon={faThumbsUp}
                           className={cx("liked-icon")}
                           onClick={handleLike}
                        />
                     ) : (
                        <FontAwesomeIcon
                           size="1x"
                           icon={faThumbsUp}
                           className={cx("like-icon")}
                           onClick={handleLike}
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
