import {
   SET_PRESENTATION,
   FETCHING_API,
   FETCHING_API_SUCCESS,
   FETCHING_API_FAILED,
   SET_INIT,
   SET_USERS,
   SET_GROUPS,
   SET_REPORTS
} from "./contants";

export const setPresentation = (payload) => ({
   type: SET_PRESENTATION,
   payload
});

export const setUsers = (payload) => ({
   type: SET_USERS,
   payload
});

export const setGroups = (payload) => ({
   type: SET_GROUPS,
   payload
});

export const setReports = (payload) => ({
   type: SET_REPORTS,
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
   setPresentation,
   setUsers,
   setGroups,
   setReports,
   fetchApi,
   fetchApiSuccess,
   fetchApiFailed,
   setInit
};
