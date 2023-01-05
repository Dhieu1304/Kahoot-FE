import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { PRESENTATION_ACTION } from "./action";

const initialState = {
   countSlide: 1,
   ordinalSlideNumber: 1,
   joinHost: "",
   slide: {}
};
const PresentationContext = createContext(initialState);

const PresentationProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const value = {
      countSlide: state.countSlide,
      ordinalSlideNumber: state.ordinalSlideNumber,
      joinHost: state.joinHost,
      // slide: state.slide,
      setCountSlide: (data) => {
         dispatch({ type: PRESENTATION_ACTION.SET_COUNT_SLIDE, payload: data });
      },
      setOrdinalSlideNumber: (data) => {
         dispatch({ type: PRESENTATION_ACTION.SET_ORDINAL_SLIDE_NUMBER, payload: data });
      },
      setJoinHost: (data) => {
         dispatch({ type: PRESENTATION_ACTION.SET_JOIN_HOST, payload: data });
      }
      // setSlide: (data) => {
      //    dispatch({ type: PRESENTATION_ACTION.SET_SLIDE, payload: data });
      // }
   };
   return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
};

export { PresentationContext, PresentationProvider };
