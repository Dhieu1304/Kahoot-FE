import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useState } from "react";
import { useModal } from "../../../../components/Modal";

function PresentationProvider({ children }) {
   const createModal = useModal();
   const renameModal = useModal();
   const deleteModal = useModal();
   const inviteModal = useModal();
   const changePresentationTypeModal = useModal();

   const rest = {
      createModal,
      renameModal,
      deleteModal,
      inviteModal,
      changePresentationTypeModal
   };

   const [state, dispatch] = useReducer(reducer, initState);

   // method
   const loadPresentations = async (type) => {
      dispatch(actions.setListType(type));

      dispatch(actions.fetchApi());

      let presentations = null;
      switch (type) {
         case "OWNER":
            presentations = await presentationServices.getOwnedPresentations();
            break;
         case "CO_OWNER":
            presentations = await presentationServices.getCoOwnedPresentations();
            break;
         default:
            break;
      }

      if (presentations) {
         dispatch(actions.setPresentations(presentations));
      } else {
         const message = "Error API";
         dispatch(actions.fetchApiFailed(message));
      }

      return presentations;
   };

   const initPresentations = async (type) => {
      dispatch(actions.setListType(type));
      return await loadPresentations(type);
   };

   const setInit = () => {
      dispatch(actions.setInit(true));
   };

   const deletePresentation = async (presentationId) => {
      const resultPresentation = await presentationServices.deletePresentationById(presentationId);

      if (resultPresentation) {
         return await loadPresentations(state.listType);
      }
   };

   const renamePresentation = async (presentationId, name) => {
      const resultPresentation = await presentationServices.savePresentation(
         { name },
         presentationId
      );

      if (resultPresentation) {
         return await loadPresentations(state.listType);
      }
   };

   const changePresentationType = async (presentationId, type) => {
      const resultPresentation = await presentationServices.savePresentation(
         { type },
         presentationId
      );

      if (resultPresentation) {
         return await loadPresentations(state.listType);
      }
   };

   const addPresentationCoOwner = async (presentationId, email) => {
      dispatch(actions.fetchApi());
      const result = await presentationServices.addPresentationCoOwner(presentationId, email);
      if (result) {
         dispatch(actions.fetchApiSuccess());
      } else {
         const message = "Error API";
         dispatch(actions.fetchApiFailed(message));
      }
   };

   const method = {
      initPresentations,
      setInit,
      deletePresentation,
      renamePresentation,
      addPresentationCoOwner,
      changePresentationType
   };

   return <Context.Provider value={{ state, method, ...rest }}>{children}</Context.Provider>;
}

export default PresentationProvider;
