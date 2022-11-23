import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { USER_ACTION } from "./action";

const initialState = {
   user: {},
   isLogin: false
};
const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const value = {
      user: state.user,
      isLogin: state.isLogin,
      setUser: (data) => {
         dispatch({ type: USER_ACTION.INFO, payload: data });
      },
      login: () => {
         dispatch({ type: USER_ACTION.LOGIN });
      },
      logout: () => {
         dispatch({ type: USER_ACTION.LOGOUT });
      }
   };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
