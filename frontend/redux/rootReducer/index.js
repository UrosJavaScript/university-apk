// rootReducer.js

import { combineReducers } from "redux";
import authReducer from "../authReducer";
import formularReducer from "../formularReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  formular: formularReducer, 
  // Add other reducers here if needed
});

export default rootReducer;
