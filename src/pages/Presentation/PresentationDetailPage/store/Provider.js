import { useReducer, useState } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";
import { useModal } from "../../../../components/Modal";

function PresentationDetailProvider({ children }) {
   const createSlideModal = useModal();
   const changeThemeModal = useModal();
   const deleteSlideModal = useModal();

   const [showSlideListWhenNotDesktop, setShowSlideListWhenNotDesktop] = useState(false);

   const rest = {
      createSlideModal,
      changeThemeModal,
      deleteSlideModal,
      showSlideListWhenNotDesktop,
      setShowSlideListWhenNotDesktop
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

         const slideTypesConfig = await presentationServices.getListSlideTypeConfig();

         if (slideTypesConfig) {
            dispatch(actions.setSlideTypesConfig(slideTypesConfig));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         // dispatch(actions.setCheckLoadNewData());
         // dispatch(actions.setInit(true));

         return { presentationThemes, slideTypesConfig };
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
      },

      saveSlides: async (slide, index) => {
         dispatch(actions.fetchApi());

         const oldSlides = [...state.slides];
         const newSlides = oldSlides.map((cur) => cur);

         newSlides.splice(index, 1, slide);

         // const resultPresentation = await presentationServices.savePresentation(state.presentation);

         const resultSlide = await presentationServices.updateSlides(
            state.presentation.id,
            newSlides
         );

         const id = state.presentation.id;

         if (resultSlide) {
            dispatch(actions.fetchApi());

            const slides = await presentationServices.getAllSlidesByPresentationId(id);

            if (slides) {
               dispatch(actions.setSlides(slides));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
            }
         }

         dispatch(actions.setCheckLoadNewData());
      },

      deleteSlide: async (index) => {
         dispatch(actions.fetchApi());

         const oldSlides = [...state.slides];
         const newSlides = oldSlides.map((cur) => cur);

         newSlides.splice(index, 1);

         // const resultPresentation = await presentationServices.savePresentation(state.presentation);

         const resultSlide = await presentationServices.updateSlides(
            state.presentation.id,
            newSlides
         );

         const id = state.presentation.id;

         if (resultSlide) {
            dispatch(actions.fetchApi());

            const slides = await presentationServices.getAllSlidesByPresentationId(id);

            if (slides) {
               dispatch(actions.setSlides(slides));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
            }
         }

         dispatch(actions.setCheckLoadNewData());
      },

      savePresentation: async (presentationSaveData) => {
         dispatch(actions.fetchApi());

         const id = state.presentation.id;

         const resultPresentation = await presentationServices.savePresentation(
            presentationSaveData,
            id
         );

         if (resultPresentation) {
            dispatch(actions.fetchApi());

            const presentation = await presentationServices.getPresentationById(id);

            if (presentation) {
               dispatch(actions.setPresentation(presentation));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
            }
         }

         dispatch(actions.setCheckLoadNewData());
      },

      createNewSlide: async (slide, index) => {
         dispatch(actions.fetchApi());

         const oldSlides = [...state.slides];
         const newSlides = oldSlides.map((cur) => cur);

         newSlides.splice(index, 0, slide);

         const resultSlide = await presentationServices.updateSlides(
            state.presentation.id,
            newSlides
         );

         const id = state.presentation.id;

         if (resultSlide) {
            dispatch(actions.fetchApi());

            const slides = await presentationServices.getAllSlidesByPresentationId(id);

            if (slides) {
               dispatch(actions.setSlides(slides));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
            }
         }

         dispatch(actions.setCheckLoadNewData());
      }
   };

   return <Context.Provider value={{ state, method, ...rest }}> {children} </Context.Provider>;
}

export default PresentationDetailProvider;
