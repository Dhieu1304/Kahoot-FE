import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { AuthContext } from "../../../providers/auth";
import { getGroupsByJoinedUserId, getGroupsByOwnUserId } from "../../../services/groupService";

function AddGroupToPresentationModal({
   show,
   setShow,
   data,
   setData,
   handleSubmitAddGroupModal,
   existedGroupIds
}) {
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
         group: []
      },
      criteriaMode: "all"
   });

   const [groupList, setGroupList] = useState([]);

   const authContext = useContext(AuthContext);

   useEffect(() => {
      const loadData = async () => {
         const userId = authContext.user.id;
         const groupOwnedData = await getGroupsByOwnUserId(userId);

         console.log("loadData groups");

         const newGroupOwnedData = groupOwnedData?.filter(
            (group) => !existedGroupIds.includes(group.id)
         );

         const groupJoinedData = await getGroupsByJoinedUserId(userId);

         const newGroupJoinedData = groupJoinedData?.filter(
            (group) => !existedGroupIds.includes(group.id)
         );

         const groups = [
            {
               label: "Owned",
               options: newGroupOwnedData
            },
            {
               label: "Joined",
               options: newGroupJoinedData
            }
         ];

         setGroupList(groups);
      };

      loadData();
   }, [authContext.user.id, existedGroupIds]);

   const handleSubmitModal = async (submitData) => {
      await handleSubmitAddGroupModal(submitData);
      reset();
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={"Add Group to Presentation"}
         show={show}
         setShow={setShow}
         data={data}
         setData={setData}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitModal)}
         submitBtnTitle={"Add"}
      >
         <div>
            <span>Groups</span>

            <Controller
               control={control}
               rules={{}}
               render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                  <Select
                     isMulti={false}
                     defaultValue={watch("groups")}
                     placeholder="Select"
                     onChange={onChange}
                     value={value}
                     onBlur={onBlur}
                     options={groupList}
                     isSearchable={false}
                     formatGroupLabel={({ label }) => {
                        return <div>{label}</div>;
                     }}
                     formatOptionLabel={({ name }) => {
                        return <div>{name}</div>;
                     }}
                     getOptionValue={(option) => option.id}
                     theme={"white"}
                  />
               )}
               name="group"
            />
         </div>
      </Modal>
   );
}

export default AddGroupToPresentationModal;
