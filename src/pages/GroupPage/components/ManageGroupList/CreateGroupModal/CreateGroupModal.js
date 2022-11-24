import { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import { AuthContext } from "../../../../../providers/auth";
import { createGroup } from "../../../../../services/groupService";

function CreateGroupModal({ show, setShow }) {
   const {
      register,
      handleSubmit,
      watch,
      resetField,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         name: ""
      },
      criteriaMode: "all"
   });

   const authContext = useContext(AuthContext);

   console.log("authContext.user in CreateGroupModal: ", authContext.user);

   const handleSubmitCreateModal = async (data) => {
      console.log("handleSubmitCreateModal: data: ", data);

      const group = await createGroup(data.name, authContext.user.id);

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
