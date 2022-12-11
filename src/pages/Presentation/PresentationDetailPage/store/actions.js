import {
   SET_PRESENTATION,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED
} from "./contants";

export const setPresentation = (payload) => ({
   type: SET_PRESENTATION,
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
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed
};
