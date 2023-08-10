import { combineReducers } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication";
import genericSlice from "./generic";
export default combineReducers({
  authenticationSlice,
  genericSlice
});
