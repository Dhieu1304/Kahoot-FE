import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { AuthContext } from "../../../providers/auth";
import { getGroupsByJoinedUserId, getGroupsByOwnUserId } from "../../../services/groupService";

function RenamePresentationModal({ show, setShow, data, setData, handleSubmitRenameModal }) {
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      control,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         name: ""
      },
      criteriaMode: "all"
   });

   const [groupList, setGroupList] = useState([]);

   const authContext = useContext(AuthContext);

   useEffect(() => {
      const loadData = async () => {
         const userId = authContext.user.id;
         const groupOwnedData = await getGroupsByOwnUserId(userId);

         const groupJoinedData = await getGroupsByJoinedUserId(userId);

         const groups = [
            {
               label: "Owned",
               options: groupOwnedData
            },
            {
               label: "Joined",
               options: groupJoinedData
            }
         ];

         setGroupList(groups);
      };

      loadData();
   }, [authContext.user.id]);

   const handleSubmitModal = async (submitData) => {
      await handleSubmitRenameModal(submitData);
      reset();
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={"Rename Presentation"}
         show={show}
         setShow={setShow}
         data={data}
         setData={setData}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitModal)}
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
