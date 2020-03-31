import { SET_ERRORS } from "../actions/actionTypes";

const initialState = { errors: [] };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: Object.keys(payload).map(err => `${payload[err]}`)
      };
    default:
      return state;
  }
};

export default reducer;
