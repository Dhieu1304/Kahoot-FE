import { useContext } from "react";
import { AuthContext } from "./provider";

const useAuthStore = () => {
   return useContext(AuthContext);
};

export { useAuthStore };
