import { useContext } from "react";
import Context from "./Context";

const usePresentationDetailStore = () => {
   const { state, method } = useContext(Context);
   return { state, method };
};

export { usePresentationDetailStore };
