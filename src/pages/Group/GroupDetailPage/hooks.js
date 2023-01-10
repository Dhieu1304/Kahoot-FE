import { useContext } from "react";
import Context from "./Context";

const useGroupDetailPageStore = () => {
   return useContext(Context);
};

export { useGroupDetailPageStore };
