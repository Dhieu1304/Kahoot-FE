import {
   SET_PRESENTATION,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED,
   SET_SLIDES,
   SET_INIT,
   CHECK_LOAD_NEW_DATA,
   SET_PRESENTATION_TYPES_CONFIG,
   SET_PRESENTATION_THEMES_CONFIG,
   SET_SLIDE_TYPES_CONFIG
} from "./contants";

const initState = {
   presentation: {},
   slides: [],

   isInit: false,
   isLoading: false,
   isFetchApiError: false,
   fetchApiError: "",

   checkLoadNewData: true,

   presentationTypesConfig: [],
   presentationThemesConfig: [],
   slideTypesConfig: []
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
      case SET_SLIDES: {
         return {
            ...state,

            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",

            slides: action.payload
         };
      }

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

      case CHECK_LOAD_NEW_DATA: {
         const newCheckLoadNewData = !state.checkLoadNewData;

         return {
            ...state,
            checkLoadNewData: newCheckLoadNewData
         };
      }

      case SET_PRESENTATION_TYPES_CONFIG: {
         return {
            ...state,
            presentationTypesConfig: action.payload
         };
      }
      case SET_PRESENTATION_THEMES_CONFIG: {
         return {
            ...state,
            presentationThemesConfig: action.payload
         };
      }
      case SET_SLIDE_TYPES_CONFIG: {
         return {
            ...state,
            slideTypesConfig: action.payload
         };
      }

      default:
         throw new Error("Invalid action");
   }
}

export { initState };
export default reducer;
