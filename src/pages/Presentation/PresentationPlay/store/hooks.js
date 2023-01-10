import { useContext } from "react";
import Context from "./Context";

const usePresentationPlayStore = () => {
   const { state, method, ...rest } = useContext(Context);
   return { state, method, ...rest };
};

export { usePresentationPlayStore };
