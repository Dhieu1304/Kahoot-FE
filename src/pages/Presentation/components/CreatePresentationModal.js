import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { AuthContext } from "../../../providers/auth";
import { getGroupsByJoinedUserId, getGroupsByOwnUserId } from "../../../services/groupService";

import presentationServices from "../../../services/presentationServices";

function CreatePresentationModal({ show, setShow, data, setData, handleSubmitCreateModal }) {
   const {
      register,
      handleSubmit,
      reset,
      control,
      watch,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         name: "",

         groups: [],
         type: "PUBLIC"
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
      await handleSubmitCreateModal(submitData);
      reset();
      setShow(false);
      setData(null);
   };

   return (
      <Modal
         title={"Create Presentation"}
         show={show}
         setShow={setShow}
         data={data}
         setData={setData}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSubmitModal)}
         submitBtnTitle={"Create"}
      >
         <Input
            placeholder="Name"
            label={"Name"}
            showLabel
            type={"txt"}
            {...register("name", {
               required: "is required"
            })}
            error={errors.name}
         />

         <div className="my-2">
            <span>Type</span>
            <div className="d-flex justify-content-start">
               <div>
                  <input
                     checked={watch("type") === "PRIVATE"}
                     type="radio"
                     value={"PRIVATE"}
                     {...register("type")}
                  />
                  <span className="mx-2">Private</span>
               </div>
               <div>
                  <input
                     checked={watch("type") === "PUBLIC"}
                     type="radio"
                     value={"PUBLIC"}
                     {...register("type")}
                  />
                  <span className="mx-2">Public</span>
               </div>
            </div>
         </div>

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

export default CreatePresentationModal;
