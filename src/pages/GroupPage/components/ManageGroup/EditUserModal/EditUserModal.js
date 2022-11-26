import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";
import classNames from "classnames/bind";

import { AuthContext } from "../../../../../providers/auth";
import {
   createGroup,
   getInviteLink,
   inviteToGroupByEmail
} from "../../../../../services/groupService";
import styles from "./EditUserModal.module.scss";
import Button from "../../../../../components/Button/Button";
const cx = classNames.bind(styles);

function EditUserModal({ show, setShow, groupId }) {
   const {
      register,
      handleSubmit,
      watch,
      resetField,
      setValue,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         role: "2"
      },
      criteriaMode: "all"
   });

   const authContext = useContext(AuthContext);

   const handleSubmitModal = (data) => {
      console.log("handleSubmitModal: data: ", data);
   };

   return (
      <Modal
         title={"Edit Role"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitModal)}
      >
         <div className={cx("input-group")}>
            <div className={cx("input-item")}>
               <input
                  className={cx("input-field")}
                  {...register("role")}
                  type="radio"
                  value="1"
                  checked={"1" === watch("role")}
               />
               <label>Own</label>
            </div>
            <div className={cx("input-item")}>
               <input
                  className={cx("input-field")}
                  {...register("role")}
                  type="radio"
                  value="2"
                  checked={"2" === watch("role")}
               />
               <label>Co-owned</label>
            </div>
            <div className={cx("input-item")}>
               <input
                  className={cx("input-field")}
                  {...register("role")}
                  type="radio"
                  value="3"
                  checked={"3" === watch("role")}
               />
               <label>Member</label>
            </div>
         </div>
      </Modal>
   );
}

export default EditUserModal;
