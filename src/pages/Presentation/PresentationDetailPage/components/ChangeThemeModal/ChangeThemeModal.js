import { useForm } from "react-hook-form";

import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import classNames from "classnames/bind";
import styles from "./ChangeThemeModal.module.scss";
const cx = classNames.bind(styles);

function ChangeThemeModal({ show, setShow }) {
   const handleSubmitCreateModal = async (data) => {};

   return (
      <Modal
         title={"Create Slide"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmitCreateModal}
         submitBtnTitle={"Create"}
      >
         <div className={cx("choice-theme-group")}>
            <div className={cx("item")}>
               <input type="radio" value="DARK" name="theme" />
               <span className={cx("label")}>Dark</span>
            </div>
            <div className={cx("item")}>
               <input type="radio" value="LIGHT" name="theme" />
               <span className={cx("label")}>Light</span>
            </div>
         </div>
      </Modal>
   );
}

export default ChangeThemeModal;
