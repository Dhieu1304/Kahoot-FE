import { useContext } from "react";
import Context from "./context";

const useGroupListContext = () => {
   return useContext(Context);
};

export { useGroupListContext };
