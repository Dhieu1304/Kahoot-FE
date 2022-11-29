import { USER_ACTION } from "./action";
import { LOCAL_STORAGE, removeItem } from "../../utils/localStorage";

export const reducer = (state, action) => {
   let newState;

   switch (action.type) {
      case USER_ACTION.LOGIN:
         newState = {
            ...state,
            isLogin: true
         };
         break;
      case USER_ACTION.INFO:
         newState = {
            ...state,
            user: action.payload
         };
         break;
      case USER_ACTION.LOGOUT:
         newState = {
            ...state,
            isLogin: false
         };
         removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
         removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
         break;
      default:
         throw new Error("invalid action");
   }
   console.log(">>>> newState: ", newState);
   return newState;
};
