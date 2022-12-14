import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import mockApi from "../../../../mockApi";

function PresentationDetailProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      loadPresentationDetail: async (id) => {
         console.log("loadPresentationDetail");
         dispatch(actions.fetchApi());
         const presentation = await presentationServices.getPresentationById(id);

         console.log("presentation: ", presentation);

         if (presentation) {
            dispatch(actions.setPresentation(presentation));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
            return presentation;
         }

         // presentation true
         dispatch(actions.fetchApi());

         const slideId = presentation.questions[state.currentSlideIndex].id;

         console.log("slideId: ", slideId);

         const slide = await presentationServices.getSlideById(slideId);

         console.log("slide: ", slide);

         if (slide) {
            dispatch(actions.setCurrentSlide(slide));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         return presentation;
      },

      setCurrentSlide: async (index) => {
         console.log("setCurrentSlide");
         dispatch(actions.fetchApi());

         dispatch(actions.setCurrentSlideIndex(index));

         const id = state.presentation.questions[index].id;

         console.log("id: ", id);

         const slide = await presentationServices.getSlideById(id);

         if (presentation) {
            dispatch(actions.setCurrentSlide(slide));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }
         return slide;
      }
   };

   return <Context.Provider value={{ state, method }}> {children} </Context.Provider>;
}

export default PresentationDetailProvider;
