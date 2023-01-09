import { useContext } from "react";
import Context from "./Context";

const useGroupPageStore = () => {
   return useContext(Context);
};

export { useGroupPageStore };
