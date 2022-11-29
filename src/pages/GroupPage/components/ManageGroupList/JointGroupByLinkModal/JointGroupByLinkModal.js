import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import { AuthContext } from "../../../../../providers/auth";
import { useGroupListContext } from "../../../../../providers/groupList";
import { getGroupsByOwnUserId, joinGroupByLink } from "../../../../../services/groupService";

function JointGroupByLinkModal({ show, setShow }) {
   const {
      register,
      resetField,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         link: ""
      },
      criteriaMode: "all"
   });

   const authContext = useContext(AuthContext);
   const groupListContext = useGroupListContext();

   const location = useLocation();
   const navigate = useNavigate();

   const handleJoinByLink = async (data) => {
      const link = data.link;
      const result = await joinGroupByLink(authContext.user.id, link);
      if (result) {
         if (location.pathname === "/group/owned") {
            const groupsData = await getGroupsByOwnUserId(authContext.user.id);
            console.log("groupsData: ", groupsData);
            groupListContext?.method?.setGroups(groupsData);
         } else {
            navigate("/group/owned");
         }
         toast("Join success");
         resetField("link");
         setShow(false);
      } else {
         toast("Join Fail");
      }
   };

   return (
      <Modal title={"Create group"} show={show} setShow={setShow} haveSubmitBtn={false}>
         <Input
            placeholder="Link"
            label={"Link"}
            showLabel
            type={"txt"}
            {...register("link")}
            rightBtn={<Button title={"Joint"} basicBlue rounded big onClick={handleJoinByLink} />}
         />
      </Modal>
   );
}

export default JointGroupByLinkModal;
