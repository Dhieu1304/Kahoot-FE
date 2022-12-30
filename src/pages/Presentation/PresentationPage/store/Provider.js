import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useState } from "react";

function PresentationProvider({ children }) {
   const [showCreateModal, setShowCreateModal] = useState(false);
   const [showRenameModal, setShowRenameModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showInviteModal, setShowInviteModal] = useState(false);
   const [selectedPresentationIdToAction, setSelectedPresentationIdToAction] = useState(-1);

   const rest = {
      showCreateModal,
      setShowCreateModal,
      showRenameModal,
      setShowRenameModal,
      showDeleteModal,
      setShowDeleteModal,
      showInviteModal,
      setShowInviteModal,
      selectedPresentationIdToAction,
      setSelectedPresentationIdToAction
   };

   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      loadPresentations: async () => {
         dispatch(actions.fetchApi());
         const data = await presentationServices.getOwnedPresentations();

         console.log("data: ", data);

         if (data) {
            const { presentations, count } = data;

            console.log("{ presentations, count }: ", { presentations, count });
            dispatch(actions.setPresentations({ presentations, count }));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         return data;
      },

      deletePresentation: async (presentationId) => {
         const resultPresentation = await presentationServices.deletePresentationById(
            presentationId
         );

         console.log("resultPresentation: ", resultPresentation);

         if (resultPresentation) {
            dispatch(actions.fetchApi());
            const data = await presentationServices.getOwnedPresentations();

            console.log("data: ", data);

            if (data) {
               const { presentations, count } = data;

               console.log("{ presentations, count }: ", { presentations, count });
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
