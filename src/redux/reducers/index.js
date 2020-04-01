import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";
import errorReducer from "./errors";
import channelsReducer from "./channels";
import messagesReducer from "./messages";

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  user: userReducer,
  errors: errorReducer
});
