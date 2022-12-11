import { useContext } from "react";
import Context from "./Context";

const usePresentationStore = () => {
   return useContext(Context);
};

export { usePresentationStore };
