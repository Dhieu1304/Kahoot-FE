import { useContext } from "react";
import Context from "./context";

const useGroupItemContext = (x) => {
   const { state, method } = useContext(Context);
   return { state, method };
};

export { useGroupItemContext };
