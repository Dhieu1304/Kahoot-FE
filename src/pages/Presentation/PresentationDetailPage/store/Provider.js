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
            if (slides.length === 0) {
               const slide = {
                  presentation_id: id,
                  ordinal_slide_number: 1,
                  slide_type_id: 1,
                  title: "Slide 1",
                  body: [
                     {
                        id: 1,
                        name: "option 1"
                     },
                     {
                        id: 2,
                        name: "option 1"
                     }
                  ]
               };
               slides.push(slide);
            }

            dispatch(actions.setSlides(slides));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         // const slideId = presentation.questions[state.currentSlideIndex].id;

         //

         // const slide = await presentationServices.getSlideById(slideId);

         //

         // if (slide) {
         //    dispatch(actions.setCurrentSlide(slide));
         // } else {
         //    const message = "Error API";
         //    dispatch(actions.fetchApiFailed(message));
         // }

         return presentation;
      },

      setCurrentSlide: async (index) => {
         //
         // dispatch(actions.fetchApi());

         dispatch(actions.setCurrentSlideIndex(index));

         const slide = state.slides[index];
         dispatch(actions.setCurrentSlide(slide));

         //

         //    const slide = await presentationServices.getSlideById(id);

         //    if (presentation) {
         //       dispatch(actions.setCurrentSlide(slide));
         //    } else {
         //       const message = "Error API";
         //       dispatch(actions.fetchApiFailed(message));
         //    }
         //    return slide;
      },
      changeSlides: (newSlide) => {
         const newSlides = [...state.slides];
         // newSlides[state.currentSlideIndex] === newSlide;

         newSlides.splice(state.currentSlideIndex, 1, newSlide);

         dispatch(actions.setSlides(newSlides));
      },

      save: async (index) => {
         dispatch(actions.fetchApi());
         const result = await presentationServices.updateSlides(
            state.presentation.id,
            state.slides
         );

         if (result) {
            const presentation = await presentationServices.getPresentationById(id);

            if (presentation) {
               dispatch(actions.setPresentation(presentation));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
               return presentation;
            }
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
            return false;
         }
      }
   };

   return <Context.Provider value={{ state, method }}> {children} </Context.Provider>;
}

export default PresentationDetailProvider;
