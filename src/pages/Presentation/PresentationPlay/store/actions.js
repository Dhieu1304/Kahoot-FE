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

export const setPresentation = (payload) => ({
   type: SET_PRESENTATION,
   payload
});

export const setSlides = (payload) => ({
   type: SET_SLIDES,
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

export const setInit = (payload) => ({
   type: SET_INIT,
   payload
});

export const setCheckLoadNewData = (payload) => ({
   type: CHECK_LOAD_NEW_DATA,
   payload
});

export const setPresentationTypesConfig = (payload) => ({
   type: SET_PRESENTATION_TYPES_CONFIG,
   payload
});

export const setPresentationThemesConfig = (payload) => ({
   type: SET_PRESENTATION_THEMES_CONFIG,
   payload
});

export const setSlideTypesConfig = (payload) => ({
   type: SET_SLIDE_TYPES_CONFIG,
   payload
});

export default {
   setSlides,
   setPresentation,
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed,
   setInit,
   setCheckLoadNewData,

   setPresentationTypesConfig,
   setPresentationThemesConfig,
   setSlideTypesConfig
};
