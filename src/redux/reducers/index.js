import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";
import errorReducer from "./errors";
import channelsReducer from "./channels";
import channelReducer from "./channel";

export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  rootChannel: channelReducer,
  rootChannels: channelsReducer
});
