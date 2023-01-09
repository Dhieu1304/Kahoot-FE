import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../../../components/Modal";
import classNames from "classnames/bind";

import { AuthContext, useAuthStore } from "../../../../../providers/auth";

import styles from "./EditUserModal.module.scss";
import groupService from "../../../../../services/groupService";
import userService from "../../../../../services/userService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function EditUserModal({ show, setShow, groupId, data, setData, handleSubmitModalForm }) {
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
         roleId: data?.roleId + ""
      },
      criteriaMode: "all"
   });

   const handleSubmitModal = async ({ roleId }) => {
      const { userId } = data;
      handleSubmitModalForm && (await handleSubmitModalForm(userId, roleId));
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={"Edit Role"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitModal)}
         submitBtnTitle={"Save changes"}
      >
         <div className={cx("input-group")}>
            <div className={cx("input-item")}>
               <input
                  className={cx("input-field")}
                  {...register("roleId")}
                  type="radio"
                  value={2}
                  checked={"2" === watch("roleId")}
               />
               <label>Co-owned</label>
            </div>
            <div className={cx("input-item")}>
               <input
                  className={cx("input-field")}
                  {...register("roleId")}
                  type="radio"
                  value={3}
                  checked={"3" === watch("roleId")}
               />
               <label>Member</label>
            </div>
         </div>
      </Modal>
   );
}

export default EditUserModal;
