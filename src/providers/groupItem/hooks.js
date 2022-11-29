import { useContext } from "react";
import Context from "./context";

const useGroupItemContext = () => {
   return useContext(Context);
};

export { useGroupItemContext };
