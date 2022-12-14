import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import presentationServices from "../../../../services/presentationServices";

function PresentationProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initState);

   const method = {
      loadPresentations: async () => {
         dispatch(actions.fetchApi());
         const data = await presentationServices.getOwnedPresentations();

         console.log("data: ", data);

         if (data) {
            const { presentations, count } = data;

            console.log("{ presentations, count }: ", { presentations, count });
            dispatch(actions.SET_PRESENTATIONS({ presentations, count }));
         } else {
            const message = "Error API";
            dispatch(actions.fetchApiFailed(message));
         }

         return data;
      }
   };

   return <Context.Provider value={{ state, method }}>{children}</Context.Provider>;
}

export default PresentationProvider;
