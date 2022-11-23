import { USER_ACTION } from "./action";
import axiosClient from "../../config/axiosClient";
import { toast } from "react-toastify";
import { LOCAL_STORAGE, setItem } from "../../utils/localStorage";

export const reducer = async (state, action) => {
   let newState;

   switch (action.type) {
      case USER_ACTION.LOGIN:
         const user = await axiosClient.post("/auth/login", action.payload);
         console.log(">>>> user: ", user);

         if (user.status) {
            setItem(LOCAL_STORAGE.ACCESS_TOKEN, user?.data?.accessToken);
            setItem(LOCAL_STORAGE.REFRESH_TOKEN, user?.data?.refreshToken);
         } else {
            toast.error(user?.message);
         }
         break;
      case USER_ACTION.REGISTER:
         break;
      default:
         throw new Error("invalid action");
   }

   return newState;
};
