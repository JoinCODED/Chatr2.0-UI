import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";
import errorReducer from "./errors";
<<<<<<< ayhamtest

export default combineReducers({
  user: userReducer,
  errors: errorReducer
=======
import channelsReducer from "./channels";
import channelViewReducer from "./viewChannel";

export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  channelsReducer: channelsReducer,
  channelViewReducer: channelViewReducer
>>>>>>> local
});
