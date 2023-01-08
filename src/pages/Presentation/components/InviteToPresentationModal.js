import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

function InviteToPresentationModal({ show, setShow, data, setData, handleInviteByEmail }) {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         email: "",
         inviteLink: ""
      },
      criteriaMode: "all"
   });

   const handleSubmitModal = async (submitData) => {
      await handleInviteByEmail(submitData);
      reset();
      setShow(false);
      setData(null);
   };

   return (
      <Modal title={"Add collaborator"} show={show} setShow={setShow} data={data} setData={setData}>
         <Input
            placeholder="Email"
            label={"Email"}
            type={"txt"}
            {...register("email", {
               required: "is required",
               pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "is wrong format"
               }
            })}
            error={errors.email}
            rightBtn={
               <Button
                  title={"Add"}
                  basicBlue
                  rounded
                  big
                  onClick={handleSubmit(handleSubmitModal)}
               />
            }
         />
      </Modal>
   );
}

export default InviteToPresentationModal;
