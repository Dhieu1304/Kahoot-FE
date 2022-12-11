import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";

function PresentationProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      setSlides: async () => {
         //  dispatch(actions.fetchApi());
         //  const slides = await presentationServices.getSlidesByPresentationId(id);
         //  if (slides) {
         //     dispatch(actions.setSlides(slides));
         //  } else {
         //     const message = "Error API";
         //     dispatch(actions.fetchApiFailed(message));
         //  }
         //  return slides;
      }
   };

   return (
      <Context.PresentationProvider value={{ state, method }}>
         {children}
      </Context.PresentationProvider>
   );
}

export default PresentationProvider;
