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

   const loadPresentationDetail = async (id) => {
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

      return presentation;
   };

   const initPresentationDetail = async (id) => {
      return await loadPresentationDetail(id);
   };

   const setInit = () => {
      dispatch(actions.setInit(true));
   };

   const method = {
      initPresentationDetail,
      setInit
   };

   return <Context.Provider value={{ state, method, ...rest }}>{children}</Context.Provider>;
}

export default PresentationManageProvider;
