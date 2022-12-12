import {
   SET_PRESENTATION,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED,
   SET_CURRENT_SLIDE,
   SET_CURRENT_SLIDE_INDEX
} from "./contants";

export const setPresentation = (payload) => ({
   type: SET_PRESENTATION,
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

export default {
   setPresentation,
   setCurrentSlide,
   setCurrentSlideIndex,
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed
};
