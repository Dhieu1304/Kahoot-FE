import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useState } from "react";

function PresentationClientDetailProvider({ children }) {
   const [showChatBox, setShowChatBox] = useState(false);
   const [showQuestionModal, setShowQuestionModal] = useState(false);
   const [showSendQuestionModal, setShowSendQuestionModal] = useState(false);

   const rest = {
      showChatBox,
      setShowChatBox,
      showQuestionModal,
      setShowQuestionModal,
      showSendQuestionModal,
      setShowSendQuestionModal
   };

   const [state, dispatch] = useReducer(reducer, initState);

   const method = {};

   return <Context.Provider value={{ state, method, ...rest }}> {children} </Context.Provider>;
}

export default PresentationClientDetailProvider;
