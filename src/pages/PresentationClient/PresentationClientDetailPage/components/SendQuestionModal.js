import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";

import { AuthContext } from "../../../../providers/auth";
import { getGroupsByJoinedUserId, getGroupsByOwnUserId } from "../../../../services/groupService";
import presentationServices from "../../../../services/presentationServices";

function SendQuestionModal({ show, setShow, handleSendQuestionForm }) {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         content: ""
      },
      criteriaMode: "all"
   });

   const handleSendQuestionModal = async ({ content }) => {
      // console.log("SendQuestionModal: ", { content });

      handleSendQuestionForm && (await handleSendQuestionForm(content));

      reset();
      setShow(false);
   };

   return (
      <Modal
         title={"Send Question"}
         show={show}
         setShow={setShow}
         haveSubmitBtn
         onSubmitModal={handleSubmit(handleSendQuestionModal)}
         submitBtnTitle={"Send"}
      >
         <Input
            placeholder="Question"
            label={"Question"}
            showLabel
            {...register("content", {
               required: "Required"
            })}
            multiple
            error={errors.content}
         />
      </Modal>
   );
}

export default SendQuestionModal;
