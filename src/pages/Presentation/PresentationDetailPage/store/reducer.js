import {
   SET_PRESENTATION,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED,
   SET_CURRENT_SLIDE,
   SET_CURRENT_SLIDE_INDEX,
   SET_SLIDES,
   CHANGE_SLIDE,
   SET_SHOW_SLIDE_LIST,
   SET_SHOW_CREATE_NEW_SLIDE_MODAL,
   SET_SHOW_CHANGE_THEME_MODAL
} from "./contants";

const initState = {
   presentation: {},
   slides: [],

   currentSlideIndex: -1,
   currentSlide: {},

   isInit: false,
   isLoading: false,
   isFetchApiError: false,
   fetchApiError: "",
   isSaving: true,

   isShowSlideListWhenNotDesktop: false,

   showCreateNewSlideModal: false,
   showChangeThemeModal: false
};

function reducer(state, action) {
   switch (action.type) {
      case SET_PRESENTATION:
         return {
            ...state,
            isInit: true,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",
            presentation: action.payload
         };
      case SET_SLIDES: {
         return {
            ...state,
            isInit: true,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",
            slides: action.payload
         };
      }

      // case CHANGE_SLIDE: {
      //    const slide = action.payload;
      //    const newSlides = [...slides];
      //    newSlides[currentSlideIndex] === slide;

      //    console.log("newSlides: ");

      //    return {
      //       ...state,
      //       slides: newSlides
      //    };
      // }
      case SET_CURRENT_SLIDE:
         return {
            ...state,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",
            currentSlide: action.payload
         };

      case SET_CURRENT_SLIDE_INDEX:
         return {
            ...state,
            isLoading: false,
            isFetchApiError: false,
            fetchApiError: "",
            currentSlideIndex: action.payload
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

      case SET_SHOW_SLIDE_LIST:
         return {
            ...state,
            isShowSlideListWhenNotDesktop: action.payload
         };

      case SET_SHOW_CREATE_NEW_SLIDE_MODAL:
         return {
            ...state,
            showCreateNewSlideModal: action.payload
         };

      case SET_SHOW_CHANGE_THEME_MODAL:
         return {
            ...state,
            showChangeThemeModal: action.payload
         };

      default:
         throw new Error("Invalid action");
   }
}

export { initState };
export default reducer;
