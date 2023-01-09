import { useContext } from "react";
import Context from "./Context";

const useGroupLayoutStore = () => {
   return useContext(Context);
};

export { useGroupLayoutStore };
