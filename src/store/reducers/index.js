import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import channels from "./channels";
import channel from "./channel";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels: channels,
  channel: channel
});
