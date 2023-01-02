import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import Button from "../../../../components/Button";
import { toast } from "react-toastify";

function InviteToPresentationModal({ show, setShow, data, setData }) {
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

   const handleInviteByEmail = async ({ email }) => {
      console.log("handleInviteByEmail: ", { data, email });
      reset();
      setShow(false);
      setData(null);
   };
   return (
      <Modal title={"Invite"} show={show} setShow={setShow} data={data} setData={setData}>
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
