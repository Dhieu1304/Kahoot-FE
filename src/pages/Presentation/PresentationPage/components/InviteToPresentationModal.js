import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import Button from "../../../../components/Button";
import { toast } from "react-toastify";

function InviteToPresentationModal({ show, setShow, groupId }) {
   const {
      register,
      handleSubmit,
      resetField,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         email: "",
         inviteLink: ""
      },
      criteriaMode: "all"
   });

   const handleInviteByEmail = async ({ email }) => {
      const result = await inviteToGroupByEmail(groupId, email);
      if (result) {
         toast("Invited");
         resetField("email");
      } else {
         toast("Invite Fail");
      }
   };
   return (
      <Modal title={"Invite"} show={show} setShow={setShow}>
         <Input
            placeholder="Email"
            label={"Email"}
            type={"txt"}
            {...register("email", {
               pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "is wrong format"
               }
            })}
            error={errors.email}
            rightBtn={
               <Button
                  title={"Invite"}
                  basicBlue
                  rounded
                  big
                  onClick={handleSubmit(handleInviteByEmail)}
               />
            }
         />
      </Modal>
   );
}

export default InviteToPresentationModal;
