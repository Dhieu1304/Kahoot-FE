import { useContext } from "react";
import Context from "./Context";

const usePresentationPlayStore = () => {
   const { state, method } = useContext(Context);
   return { state, method };
};

export { usePresentationPlayStore };
