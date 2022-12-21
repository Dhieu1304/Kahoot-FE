import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";

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

         // console.log("slides: ", slides);

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

         dispatch(actions.setCheckLoadNewData());
         dispatch(actions.setInit(true));

         return { presentation, slides };
      },

      saveSlides: async (slide, index) => {
         dispatch(actions.fetchApi());

         const oldSlides = [...state.slides];
         const newSlides = oldSlides.map((cur) => cur);

         console.log("index: ", index);
         newSlides.splice(index, 1, slide);

         console.log("oldSlides: ", oldSlides);
         console.log("newSlides: ", newSlides);

         console.log("state: ", state);

         // const resultPresentation = await presentationServices.savePresentation(state.presentation);

         const resultSlide = await presentationServices.updateSlides(
            state.presentation.id,
            newSlides
         );

         console.log("resultSlide: ", resultSlide);

         const id = state.presentation.id;
         console.log("Chuan bi load id: ", id);

         if (resultSlide) {
            dispatch(actions.fetchApi());

            const slides = await presentationServices.getAllSlidesByPresentationId(id);

            console.log("slides: ", slides);

            if (slides) {
               dispatch(actions.setSlides(slides));
            } else {
               const message = "Error API";
               dispatch(actions.fetchApiFailed(message));
            }
         }

         dispatch(actions.setCheckLoadNewData());

         // console.log("resultSlide: ", resultSlide);

         // if (resultPresentation && resultSlide) {
         //    const presentation = await presentationServices.getPresentationById(
         //       state.presentation?.id
         //    );

         //    if (presentation) {
         //       dispatch(actions.setPresentation(presentation));
         //    } else {
         //       const message = "Error API";
         //       dispatch(actions.fetchApiFailed(message));
         //       return presentation;
         //    }
         // } else {
         //    const message = "Error API";
         //    dispatch(actions.fetchApiFailed(message));
         //    return false;
         // }
      },
      createNewSlide: async (slide, index) => {
         dispatch(actions.fetchApi());

         const oldSlides = [...state.slides];
         const newSlides = oldSlides.map((cur) => cur);

         console.log("index: ", index);
         newSlides.splice(index, 0, slide);

         console.log("oldSlides: ", oldSlides);
         console.log("newSlides: ", newSlides);

         console.log("state: ", state);

         const resultSlide = await presentationServices.updateSlides(
            state.presentation.id,
            newSlides
         );

         console.log("resultSlide: ", resultSlide);

         const id = state.presentation.id;
         console.log("Chuan bi load id: ", id);

         if (resultSlide) {
            dispatch(actions.fetchApi());

            const slides = await presentationServices.getAllSlidesByPresentationId(id);

            console.log("slides: ", slides);

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

   // loadPresentationDetailReturnSlides: async (id) => {
   //    dispatch(actions.fetchApi());
   //    const presentation = await presentationServices.getPresentationById(id);

   //    if (presentation) {
   //       dispatch(actions.setPresentation(presentation));
   //    } else {
   //       const message = "Error API";
   //       dispatch(actions.fetchApiFailed(message));
   //       return presentation;
   //    }

   //    // presentation true
   //    dispatch(actions.fetchApi());

   //    const slides = await presentationServices.getAllSlidesByPresentationId(id);

   //    // console.log("slides: ", slides);

   //    if (slides) {
   //       if (slides.length === 0) {
   //          const slide = {
   //             presentation_id: id,
   //             ordinal_slide_number: 1,
   //             slide_type_id: 1,
   //             title: "Slide 1",
   //             body: [
   //                {
   //                   id: 1,
   //                   name: "option 1"
   //                },
   //                {
   //                   id: 2,
   //                   name: "option 1"
   //                }
   //             ]
   //          };
   //          slides.push(slide);
   //       }

   //       dispatch(actions.setSlides(slides));
   //    } else {
   //       const message = "Error API";
   //       dispatch(actions.fetchApiFailed(message));
   //    }

   //    return slides;
   // },

   // setCurrentSlide: async (index) => {
   //    //
   //    // dispatch(actions.fetchApi());

   //    dispatch(actions.setCurrentSlideIndex(index));

   //    const slide = state.slides[index];
   //    dispatch(actions.setCurrentSlide(slide));

   //    //

   //    //    const slide = await presentationServices.getSlideById(id);

   //    //    if (presentation) {
   //    //       dispatch(actions.setCurrentSlide(slide));
   //    //    } else {
   //    //       const message = "Error API";
   //    //       dispatch(actions.fetchApiFailed(message));
   //    //    }
   //    //    return slide;
   // },
   // changeSlides: (newSlide) => {
   //    const newSlides = [...state.slides];
   //    // newSlides[state.currentSlideIndex] === newSlide;

   //    newSlides.splice(state.currentSlideIndex, 1, newSlide);

   //    dispatch(actions.setSlides(newSlides));
   // },

   // changePresentation: (presentation) => {
   //    dispatch(actions.setPresentation(presentation));
   // },

   // save: async (slide) => {
   //    dispatch(actions.fetchApi());

   //    const oldSlides = [...state.slides];
   //    const newSlides = oldSlides.map((cur) => cur);
   //    const index = state.currentSlideIndex;

   //    console.log("index: ", index);
   //    newSlides.splice(index, 1, slide);

   //    console.log("oldSlides: ", oldSlides);
   //    console.log("newSlides: ", newSlides);

   //    console.log("state: ", state);

   //    // const resultPresentation = await presentationServices.savePresentation(state.presentation);

   //    const resultSlide = await presentationServices.updateSlides(
   //       state.presentation.id,
   //       newSlides
   //    );

   //    console.log("resultSlide: ", resultSlide);

   //    const id = state.presentation.id;
   //    console.log("Chuan bi load id: ", id);

   //    if (resultSlide) {
   //       dispatch(actions.fetchApi());

   //       const slides = await presentationServices.getAllSlidesByPresentationId(id);

   //       // console.log("slides: ", slides);

   //       if (slides) {
   //          dispatch(actions.setSlides(slides));
   //       } else {
   //          const message = "Error API";
   //          dispatch(actions.fetchApiFailed(message));
   //       }
   //    }

   // console.log("resultSlide: ", resultSlide);

   // if (resultPresentation && resultSlide) {
   // if (resultPresentation && resultSlide) {
   //    const presentation = await presentationServices.getPresentationById(
   //       state.presentation?.id
   //    );

   //    if (presentation) {
   //       dispatch(actions.setPresentation(presentation));
   //    } else {
   //       const message = "Error API";
   //       dispatch(actions.fetchApiFailed(message));
   //       return presentation;
   //    }
   // } else {
   //    const message = "Error API";
   //    dispatch(actions.fetchApiFailed(message));
   //    return false;
   // }

   // save: async () => {
   //    dispatch(actions.fetchApi());

   //    const resultPresentation = await presentationServices.savePresentation(state.presentation);
   //    const resultSlide = await presentationServices.updateSlides(
   //       state.presentation.id,
   //       state.slides
   //    );

   //    if (resultPresentation && resultSlide) {
   //       const presentation = await presentationServices.getPresentationById(
   //          state.presentation?.id
   //       );

   //       if (presentation) {
   //          dispatch(actions.setPresentation(presentation));
   //       } else {
   //          const message = "Error API";
   //          dispatch(actions.fetchApiFailed(message));
   //          return presentation;
   //       }
   //    } else {
   //       const message = "Error API";
   //       dispatch(actions.fetchApiFailed(message));
   //       return false;
   //    }
   // },

   // deleteSlide: () => {
   //    const newSlides = [...state.slides];

   //    newSlides.splice(state.currentSlideIndex, 1);

   //    dispatch(actions.setSlides(newSlides));
   // },

   // deletePresentation: async () => {
   //    // const newSlides = [...state.slides];
   //    // newSlides.splice(state.currentSlideIndex, 1);
   //    // dispatch(actions.setSlides(newSlides));
   //    const result = await presentationServices.deletePresentationById(state.presentation.id);
   // },

   // addSlide: () => {
   //    const maxSlideId = -1;

   //    const newSlide = {
   //       title: "New Slide",
   //       body: [],
   //       ordinalSlideNumber: state.currentSlideIndex,
   //       presentationId: state.presentation.id,
   //       slideTypeId: 1
   //    };

   //    const newSlides = [...state.slides];

   //    newSlides.splice(state.slides.length, 0, newSlide);

   //    dispatch(actions.setSlides(newSlides));
   // }

   // showSlideList: () => {
   //    dispatch(actions.setShowSlideList(!state.isShowSlideListWhenNotDesktop));
   // },

   // setShowCreateNewSlideModal: (value) => {
   //    dispatch(actions.setShowCreateNewSlideModal(value));
   // },

   // setShowChangeThemeModal: (value) => {
   //    dispatch(actions.setShowChangeThemeModal(value));
   // }
   // };

   return <Context.Provider value={{ state, method }}> {children} </Context.Provider>;
}

export default PresentationDetailProvider;
