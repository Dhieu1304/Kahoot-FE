import { useContext } from "react";
import Context from "./Context";

const usePresentationManageStore = () => {
   // const { state, method, ...rest } = useContext(Context);
   // return { state, method, ...rest };
   return useContext(Context);
};

export { usePresentationManageStore };
