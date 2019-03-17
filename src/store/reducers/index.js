import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import channelsReducer from "./channels";
import errorReducer from "./errors";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels: channelsReducer
});
