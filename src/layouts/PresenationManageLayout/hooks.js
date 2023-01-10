import { useContext } from "react";
import Context from "./Context";

const usePresenationManageLayoutStore = () => {
   return useContext(Context);
};

export { usePresenationManageLayoutStore };
