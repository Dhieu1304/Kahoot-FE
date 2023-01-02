import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useModal } from "../../../../components/Modal";

function PresentationManageProvider({ children }) {
   const renameModal = useModal();
   const deleteModal = useModal();
   const inviteModal = useModal();

   const rest = {
      renameModal,
      deleteModal,
      inviteModal
   };

   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      loadPresentationDetail: async (id) => {
         dispatch(actions.fetchApi());
         const presentation = await presentationServices.getPresentationById(id);

         if (presentation) {
            dispatch(actions.setPresentation(presentation));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
            return presentation;
         }

         // presentation true
         dispatch(actions.fetchApi());

         const users = [
            { id: 1, name: "Sang 1", role: "Owner" },
            { id: 2, name: "Sang 2", role: "Collaborate" },
            { id: 4, name: "Sang 4", role: "Collaborate" }
         ];

         dispatch(actions.setUsers(users));

         return { presentation, users };
      },

      setInit: () => {
         dispatch(actions.setInit(true));
      }
   };

   return <Context.Provider value={{ state, method, ...rest }}>{children}</Context.Provider>;
}

export default PresentationManageProvider;
