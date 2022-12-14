import { useContext } from "react";
import Context from "./Context";

const usePresentationStore = () => {
   const { state, method } = useContext(Context);
   return { state, method };
};

export { usePresentationStore };
