import { PRESENTATION_ACTION } from "./action";

export const reducer = (state, action) => {
   let newState;

   switch (action.type) {
      case PRESENTATION_ACTION.SET_COUNT_SLIDE:
         newState = {
            ...state,
            countSlide: action.payload
         };
         break;
      case PRESENTATION_ACTION.SET_ORDINAL_SLIDE_NUMBER:
         newState = {
            ...state,
            ordinalSlideNumber: action.payload
         };
         break;
      case PRESENTATION_ACTION.SET_JOIN_HOST:
         newState = {
            ...state,
            joinHost: action.payload
         };
         break;
      case PRESENTATION_ACTION.SET_SLIDE:
         newState = {
            ...state,
            slide: { ...action.payload }
         };
         break;
      default:
         throw new Error("invalid action");
   }

   return newState;
};
