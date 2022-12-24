import { useContext } from "react";
import Context from "./Context";

const usePresentationStore = () => {
   const { state, method, ...rest } = useContext(Context);
   return { state, method, ...rest };
};

export { usePresentationStore };
