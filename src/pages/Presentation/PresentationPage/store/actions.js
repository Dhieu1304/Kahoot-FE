import { SET_SLIDES, FETCHING_API, FETCHING_API_SUCCESS, FETCHING_API_FAILED } from "./contants";

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

export default {
   setSlides,
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed
};
