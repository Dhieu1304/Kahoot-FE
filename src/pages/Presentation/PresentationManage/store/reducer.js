import {
   SET_PRESENTATION,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED,
   SET_INIT,
   SET_USERS
} from "./contants";

const initState = {
   presentation: {},
   users: [],

   isInit: false,
   isLoading: false,
   isFetchApiError: false,
   fetchApiError: ""
};

function reducer(state, action) {
   switch (action.type) {
      case SET_PRESENTATION:
         return {
            ...state,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",
            presentation: action.payload
         };

      case SET_USERS:
         return {
            ...state,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",
            users: action.payload
         };

      case FETCHING_API:
         return {
            ...state,
            isLoading: true
         };

      case FETCHING_API_SUCCESS:
         return {
            ...state,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: ""
         };

      case FETCHING_API_FAILED:
         return {
            ...state,
            isLoading: false,
            isFetchApiError: true,
            fetchApiError: action.payload
         };

      case SET_INIT:
         return {
            ...state,
            isInit: true
         };

      default:
         throw new Error("Invalid action");
   }
}

export { initState };
export default reducer;
