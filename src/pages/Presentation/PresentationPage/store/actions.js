import {
   SET_PRESENTATIONS,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED,
   SET_INIT
} from "./contants";

export const setPresentations = (payload) => ({
   type: SET_PRESENTATIONS,
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

export default {
   setPresentations,
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed,
   setInit
};
