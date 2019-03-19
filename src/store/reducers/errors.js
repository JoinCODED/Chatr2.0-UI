import { SET_ERRORS } from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload; // Do we have to return every thing or just the data
    default:
      return state;
  }
};

export default reducer;
