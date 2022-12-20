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

export const setPresentation = (payload) => ({
   type: SET_PRESENTATION,
   payload
});

export const setSlides = (payload) => ({
   type: SET_SLIDES,
   payload
});

export const changeSlide = (payload) => ({
   type: CHANGE_SLIDE,
   payload
});

export const setCurrentSlide = (payload) => ({
   type: SET_CURRENT_SLIDE,
   payload
});

export const setCurrentSlideIndex = (payload) => ({
   type: SET_CURRENT_SLIDE_INDEX,
   payload
});

export const fetchApi = (payload) => ({
   type: FETCHING_API,
   payload
});

export const fetchApiSuccess = (payload) => ({
   type: FETCHING_API_SUCCESS,
   payload
});

export const fetchApiFailed = (payload) => ({
   type: FETCHING_API_FAILED,
   payload
});

export const setShowSlideList = (payload) => ({
   type: SET_SHOW_SLIDE_LIST,
   payload
});

export const setShowCreateNewSlideModal = (payload) => ({
   type: SET_SHOW_CREATE_NEW_SLIDE_MODAL,
   payload
});

export const setShowChangeThemeModal = (payload) => ({
   type: SET_SHOW_CHANGE_THEME_MODAL,
   payload
});

export default {
   changeSlide,
   setSlides,
   setPresentation,
   setCurrentSlide,
   setCurrentSlideIndex,
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed,
   setShowSlideList,

   setShowCreateNewSlideModal,
   setShowChangeThemeModal
};
