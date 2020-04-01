import { createStore, compose, applyMiddleware } from "redux";
import { checkForExpiredToken } from "./actions";

import thunk from "redux-thunk";

import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
store.dispatch(checkForExpiredToken());

export default store;
