import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import { AuthContext } from "../../../../../providers/auth";
import presentationServices from "../../../../../services/presentationServices";

function CreatePresentationModal({ show, setShow }) {
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

   const navigate = useNavigate();

   const handleSubmitCreateModal = async ({ name }) => {
      const presentation = await presentationServices.createPresentation(name);

      if (presentation) navigate(`/presentation/${presentation.id}/1/edit`);

      resetField("name");
      setShow(false);
   };

   return (
      <Modal
         title={"Create Presentation"}
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

export default CreatePresentationModal;
