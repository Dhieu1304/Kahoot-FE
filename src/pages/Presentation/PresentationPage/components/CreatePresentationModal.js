import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { AuthContext } from "../../../../providers/auth";
import presentationServices from "../../../../services/presentationServices";

function CreatePresentationModal({ show, setShow }) {
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

   const navigate = useNavigate();

   const handleRename = async ({ name }) => {
      // call service to rename

      //

      resetField("name");
      setShow(false);
   };

   return (
      <Modal
         title={"Create Presentation"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleRename)}
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

export default CreatePresentationModal;
