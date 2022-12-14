import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";

import { AuthContext } from "../../../../../providers/auth";
import { useGroupListContext } from "../../../../../providers/groupList";
import {
   createGroup,
   getGroupsByJoinedUserId,
   getGroupsByOwnUserId
} from "../../../../../services/groupService";

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
   const groupListContext = useGroupListContext();

   const location = useLocation();
   const navigate = useNavigate();

   const handleSubmitCreateModal = async (data) => {
      const group = await createGroup(data.name, authContext.user.id);

      if (group) {
         if (location.pathname === "/group/owned") {
            const groupsData = await getGroupsByOwnUserId(authContext.user.id);
            groupListContext?.method?.setGroups(groupsData);
         } else {
            navigate("/group/owned");
         }
      }

      resetField("name");
      setShow(false);

      toast("Create group success");
   };

   return (
      <Modal
         title={"Create group"}
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
