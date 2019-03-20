import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import channelsReducer from "./channels";
import errorsReducer from "./errors";

export default combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  errors: errorsReducer
});
