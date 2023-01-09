import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import Modal from "../../../../../components/Modal";
import { useAuthStore } from "../../../../../providers/auth";
import styles from "./QuestionModal.module.scss";
import presentationServices from "../../../../../services/presentationServices";
import { getItem, LOCAL_STORAGE } from "../../../../../utils/localStorage";
const cx = classNames.bind(styles);

function QuestionModal({ show, setShow, questionList }) {
   const authStore = useAuthStore();
   const userId = authStore.user?.id;
   const params = useParams();
   const code = params.code;
   const uid = getItem(LOCAL_STORAGE.UUID);

   const handleUpVote = async (questionId) => {
      await presentationServices.upVoteQuestion(code, questionId);
   };

   const handleDownVote = async (questionId) => {
      await presentationServices.downVoteQuestion(code, questionId);
   };

   return (
      <Modal title={"Question"} show={show} setShow={setShow} hideCancel>
         <div className={cx("container")}>
            <div className={cx("list")}>
               {questionList.map((question, index) => (
                  <div key={index} className={cx("item")}>
                     <div className={cx("content")}>
                        <span className={cx("question")}>{question?.question}</span>
                        <span className={cx("user-fullname")}>{question?.user?.full_name}</span>
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
                           className={cx("like-icon")}
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
