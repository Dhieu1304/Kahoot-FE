import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { useAuthStore } from "../../../../providers/auth";
import groupService from "../../../../services/groupService";

function CreateGroupModal({ show, setShow }) {
   const {
      register,
      handleSubmit,

      resetField,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         name: ""
      },
      criteriaMode: "all"
   });

   const authStore = useAuthStore();

   const navigate = useNavigate();

   const handleSubmitCreateModal = async (data) => {
      const group = await groupService.createGroup(data.name, authStore.user.id);

      if (group) {
         navigate("/group/owned");
         toast("Create group success");
      } else {
         toast("Create group failed");
      }

      resetField("name");
      setShow(false);
   };

   return (
      <Modal
         title={"Create group"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitCreateModal)}
         submitBtnTitle={"Create"}
      >
         <Input
            placeholder="Name"
            label={"Name"}
            showLabel
            type={"txt"}
            {...register("name", {
               required: "Name is required"
            })}
            error={errors.name}
         />
      </Modal>
   );
}

export default CreateGroupModal;
