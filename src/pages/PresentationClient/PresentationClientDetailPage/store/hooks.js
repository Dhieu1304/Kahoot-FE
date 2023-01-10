import { useContext } from "react";
import Context from "./Context";

const usePresentationClientDetailStore = () => {
   const { state, method, ...rest } = useContext(Context);
   return { state, method, ...rest };
};

export { usePresentationClientDetailStore };
