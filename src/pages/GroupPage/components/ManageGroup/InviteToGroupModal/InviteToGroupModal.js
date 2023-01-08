import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";
import classNames from "classnames/bind";
import { AuthContext } from "../../../../../providers/auth";
import { getInviteLink, inviteToGroupByEmail } from "../../../../../services/groupService";
import styles from "./InviteToGroupModal.module.scss";
import Button from "../../../../../components/Button/Button";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function InviteToGroupModal({ show, setShow, groupId }) {
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
         email: "",
         inviteLink: ""
      },
      criteriaMode: "all"
   });

   const authContext = useContext(AuthContext);

   useEffect(() => {
      const loadInviteLink = async () => {
         const inviteLink = await getInviteLink(groupId);
         setValue("inviteLink", inviteLink);
      };
      loadInviteLink();
   }, []);

   const handleInviteByEmail = async () => {
      const email = watch("email");
      const result = await inviteToGroupByEmail(groupId, email);
      if (result) {
         toast.success("Invited");
         resetField("email");
      } else {
         toast.error("Invite Fail");
      }
   };
   const handleCopyInviteLink = () => {
      const inviteLink = watch("inviteLink");
      navigator.clipboard.writeText(inviteLink);
      toast("Copied");
   };

   return (
      <Modal title={"Invite"} show={show} setShow={setShow}>
         <div className={cx("search-container")}>
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
                  <Button title={"Invite"} basicBlue rounded big onClick={handleInviteByEmail} />
               }
            />
         </div>
         <Input
            placeholder="Invite link"
            label={"Invite link"}
            showLabel
            disable
            type={"txt"}
            {...register("inviteLink", {})}
            error={errors.inviteLink}
            rightBtn={
               <Button title={"Copy"} basicBlue rounded big onClick={handleCopyInviteLink} />
            }
         />
      </Modal>
   );
}

export default InviteToGroupModal;
