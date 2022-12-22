import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../../../components/Modal";
import classNames from "classnames/bind";

import { AuthContext } from "../../../../../providers/auth";

import styles from "./EditUserModal.module.scss";
import { changeRole } from "../../../../../services/groupService";
import { useGroupItemContext } from "../../../../../providers/groupItem/hooks";
import { toast } from "react-toastify";
import { getUsersByGroupId } from "../../../../../services/userService";
const cx = classNames.bind(styles);

function EditUserModal({ show, setShow, groupId, userId }) {
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
   const groupItemContext = useGroupItemContext();

   const handleSubmitModal = async (data) => {
      const result = await changeRole(groupId, userId, data.role);

      if (result) {
         const usersData = await getUsersByGroupId(groupId);
         groupItemContext.method.setUsers(usersData);
         toast("Change success");
      } else {
         toast("Change Fail");
      }
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
