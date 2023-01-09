import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import groupService from "../../../../services/groupService";

function JointGroupByLinkModal({ show, setShow }) {
   const {
      register,
      reset,
      watch,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         link: ""
      },
      criteriaMode: "all"
   });

   const location = useLocation();
   const navigate = useNavigate();

   const handleJoinByLink = async (data) => {
      const link = watch("link");
      console.log("link: ", link);
      const result = await groupService.joinGroupByLink(link);
      if (result) {
         navigate("/group/joined");
         toast("Join success");
      } else {
         toast("Join Fail");
      }

      reset();
      setShow(false);
   };

   return (
      <Modal title={"Create group"} show={show} setShow={setShow} haveSubmitBtn={false}>
         <Input
            placeholder="Link"
            label={"Link"}
            showLabel
            type={"txt"}
            {...register("link")}
            rightBtn={<Button title={"Join"} basicBlue rounded big onClick={handleJoinByLink} />}
         />
      </Modal>
   );
}

export default JointGroupByLinkModal;
