import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { AuthContext } from "../../../providers/auth";
import { getGroupsByJoinedUserId, getGroupsByOwnUserId } from "../../../services/groupService";

function AddGroupToPresentationModal({ show, setShow, data, setData, handleSubmitRenameModal }) {
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
         groups: []
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
         <div>
            <span>Groups</span>

            <Controller
               control={control}
               rules={{}}
               render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                  <Select
                     isMulti={true}
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
               name="groups"
            />
         </div>
      </Modal>
   );
}

export default AddGroupToPresentationModal;
