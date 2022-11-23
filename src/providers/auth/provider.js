import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { USER_ACTION } from "./action";

const initialState = {
   user: {},
   accessToken: "",
   refreshToken: ""
};
const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const value = {
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      register: (data) => {
         dispatch({ type: USER_ACTION.REGISTER, payload: data });
      },
      login: (data) => {
         dispatch({ type: USER_ACTION.LOGIN, payload: data });
      },
      logout: () => {
         dispatch({ type: USER_ACTION.LOGOUT });
      },
      setToken: (name) => {
         dispatch({ type: USER_ACTION.SET_LOCAL_STORAGE, payload: name });
      },
      getToken: (name) => {
         dispatch({ type: USER_ACTION.GET_LOCAL_STORAGE, payload: name });
      }
   };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
