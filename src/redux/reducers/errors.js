import { SET_ERRORS } from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
      const errors = payload;
      return errors;
      
    default:
      return state;
  }
};

export default reducer;
