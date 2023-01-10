import { useContext } from "react";
import Context from "./Context";

const usePresentationDetailStore = () => {
   const { state, method, ...rest } = useContext(Context);
   return { state, method, ...rest };
};

export { usePresentationDetailStore };
