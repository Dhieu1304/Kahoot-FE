import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useModal } from "../../../../components/Modal";

function PresentationManageProvider({ children }) {
   const renameModal = useModal();
   const deletePresentationModal = useModal();
   const deleteMemberModal = useModal();
   const inviteModal = useModal();

   const addGroupModal = useModal();
   const deleteGroupModal = useModal();

   const rest = {
      renameModal,
      deletePresentationModal,
      deleteMemberModal,
      inviteModal,
      addGroupModal,
      deleteGroupModal
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

   const loadPresentationUsers = async (id) => {
      dispatch(actions.fetchApi());
      const users = await presentationServices.getPresentationUsers(id);

      if (users) {
         dispatch(actions.setUsers(users));
      } else {
         const message = "Error API";
         dispatch(actions.fetchApiFailed(message));
         return users;
      }

      // presentation true
      dispatch(actions.fetchApi());

      return users;
   };

   const loadPresentationGroups = async (id) => {
      dispatch(actions.fetchApi());
      const groups = await presentationServices.getPresentationGroups(id);

      if (groups) {
         dispatch(actions.setGroups(groups));
      } else {
         const message = "Error API";
         dispatch(actions.fetchApiFailed(message));
         return groups;
      }

      // groups true
      dispatch(actions.fetchApi());

      return groups;
   };

   const initPresentationDetail = async (id) => {
      const users = await loadPresentationUsers(id);
      const groups = await loadPresentationGroups(id);
      const presentation = await loadPresentationDetail(id);
      return { presentation, users, groups };
   };

   const setInit = () => {
      dispatch(actions.setInit(true));
   };

   const deleteMember = async (email) => {
      const presentationId = state.presentation?.id;
      const result = await presentationServices.deleteMember(presentationId, email);

      if (result) {
         return await loadPresentationDetail(presentationId);
      }
   };

   const addMember = async (email) => {
      const presentationId = state.presentation?.id;
      const result = await presentationServices.addPresentationCoOwner(presentationId, email);

      console.log("result: ", result);

      if (result) {
         return await loadPresentationDetail(presentationId);
      }
   };

   const method = {
      initPresentationDetail,
      setInit,
      deleteMember,
      addMember
   };

   return <Context.Provider value={{ state, method, ...rest }}>{children}</Context.Provider>;
}

export default PresentationManageProvider;
