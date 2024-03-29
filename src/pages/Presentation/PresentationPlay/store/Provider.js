import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useState } from "react";

function PresentationPlayProvider({ children }) {
   const [showChatBox, setShowChatBox] = useState(false);
   const [showQuestionModal, setShowQuestionModal] = useState(false);

   const rest = {
      showChatBox,
      setShowChatBox,
      showQuestionModal,
      setShowQuestionModal
   };

   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      loadConfig: async (id) => {
         dispatch(actions.fetchApi());
         const presentationThemes = await presentationServices.getListPresentationThemeConfig();

         if (presentationThemes) {
            dispatch(actions.setPresentationThemesConfig(presentationThemes));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
            return presentation;
         }

         // presentation true
         dispatch(actions.fetchApi());

         const slideTypes = await presentationServices.getListSlideTypeConfig();

         if (slideTypes) {
            dispatch(actions.setSlideTypesConfig(slideTypes));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         // dispatch(actions.setCheckLoadNewData());
         // dispatch(actions.setInit(true));

         return { presentationThemes, slideTypes };
      },

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

         const slides = await presentationServices.getAllSlidesByPresentationId(id);

         if (slides) {
            dispatch(actions.setSlides(slides));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         dispatch(actions.setCheckLoadNewData());
         // dispatch(actions.setInit(true));

         return { presentation, slides };
      },

      setInit: () => {
         dispatch(actions.setInit(true));
      }
   };

   return <Context.Provider value={{ state, method, ...rest }}> {children} </Context.Provider>;
}

export default PresentationPlayProvider;
