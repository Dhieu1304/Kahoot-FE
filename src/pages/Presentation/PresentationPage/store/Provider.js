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

   const rest = {
      createModal,
      renameModal,
      deleteModal,
      inviteModal
   };

   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      loadPresentations: async () => {
         dispatch(actions.fetchApi());
         const data = await presentationServices.getOwnedPresentations();

         if (data) {
            const { presentations, count } = data;

            dispatch(actions.setPresentations({ presentations, count }));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         return data;
      },

      setInit: () => {
         dispatch(actions.setInit(true));
      },

      deletePresentation: async (presentationId) => {
         const resultPresentation = await presentationServices.deletePresentationById(
            presentationId
         );

         if (resultPresentation) {
            dispatch(actions.fetchApi());
            const data = await presentationServices.getOwnedPresentations();

            if (data) {
               const { presentations, count } = data;

               dispatch(actions.setPresentations({ presentations, count }));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
            }

            return data;
         }
      }
   };

   return <Context.Provider value={{ state, method, ...rest }}>{children}</Context.Provider>;
}

export default PresentationProvider;
