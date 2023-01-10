import { useForm } from "react-hook-form";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

function RenameGroupModal({ show, setShow, data, setData, handleSubmitModalForm }) {
   const {
      register,
      handleSubmit,
      reset,

      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         name: ""
      },
      criteriaMode: "all"
   });

   const handleSubmitModal = async ({ name }) => {
      handleSubmitModalForm && (await handleSubmitModalForm(name));
      setShow(false);
      reset();
      setData(null);
   };
   return (
      <Modal
         title={"Rename group"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitModal)}
         submitBtnTitle={"Save"}
      >
         <Input
            placeholder="Name"
            label={"Name"}
            showLabel
            type={"txt"}
            {...register("name", { required: "is required" })}
            error={errors.name}
         />
      </Modal>
   );
}

export default RenameGroupModal;
