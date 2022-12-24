import { useForm } from "react-hook-form";

import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import presentationServices from "../../../../services/presentationServices";

function RenamePresentationModal({ show, setShow }) {
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

   const handleSubmitRenameModal = async ({ name }) => {
      // call service to rename

      //

      console.log("name: ", name);

      resetField("name");
      setShow(false);
   };

   return (
      <Modal
         title={"Rename Presentation"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitRenameModal)}
         submitBtnTitle={"Rename"}
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

export default RenamePresentationModal;
