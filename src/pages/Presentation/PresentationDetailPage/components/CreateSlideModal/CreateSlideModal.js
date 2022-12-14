import { useForm } from "react-hook-form";

import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import classNames from "classnames/bind";
import styles from "./CreateSlideModal.module.scss";
import { usePresentationDetailStore } from "../../store";
const cx = classNames.bind(styles);

function CreateSlideModal({ show, setShow }) {
   const presentationDetailStore = usePresentationDetailStore();
   const handleSubmitCreateModal = async (data) => {
      presentationDetailStore.method.addSlide();
   };

   return (
      <Modal
         title={"Create Slide"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmitCreateModal}
         submitBtnTitle={"Create"}
      >
         <div className={cx("choice-slide-group")}>
            <div className={cx("item")}>
               <input type="radio" value="MULTI" name="type" />
               <span className={cx("label")}>Muti choices</span>
            </div>
            {/* <div className={cx("item")}>
               <input type="radio" value="SLIDE" name="type" />
               <span className={cx("label")}>Slide</span>
            </div>
            <div className={cx("item")}>
               <input type="radio" value="QUIZ" name="type" />
               <span className={cx("label")}>Quiz</span>
            </div> */}
         </div>
      </Modal>
   );
}

export default CreateSlideModal;
