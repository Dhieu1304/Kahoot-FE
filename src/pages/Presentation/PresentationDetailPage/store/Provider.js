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
         // const presentation = { x: "sang" };
         if (presentation) {
            dispatch(actions.setPresentation(presentation));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }
         return presentation;
      }
   };

   return <Context.Provider value={{ state, method }}> {children} </Context.Provider>;
}

export default PresentationDetailProvider;
