import { useForm } from "react-hook-form";

import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import classNames from "classnames/bind";
import styles from "./CreateSlideModal.module.scss";
const cx = classNames.bind(styles);

function CreateSlideModal({ show, setShow }) {
   const handleSubmitCreateModal = async (data) => {
      // const group = await createGroup(data.name, authContext.user.id);
      // if (group) {
      //    if (location.pathname === "/group/owned") {
      //       const groupsData = await getGroupsByOwnUserId(authContext.user.id);
      //       groupListContext?.method?.setGroups(groupsData);
      //    } else {
      //       navigate("/group/owned");
      //    }
      // }
      // resetField("name");
      // setShow(false);
      // toast("Create group success");
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
               <input type="radio" value="SLIDE" name="type" />
               <span className={cx("label")}>Slide</span>
            </div>
            <div className={cx("item")}>
               <input type="radio" value="MULTI" name="type" />
               <span className={cx("label")}>Muti choices</span>
            </div>
            <div className={cx("item")}>
               <input type="radio" value="QUIZ" name="type" />
               <span className={cx("label")}>Quiz</span>
            </div>
         </div>
      </Modal>
   );
}

export default CreateSlideModal;
