import { SET_LOADING } from "../actions/actionTypes";

const initialState = { loading: false };
const reducer = (state = initialState, { type }) => {
  switch (type) {
    case SET_LOADING:
      return { loading: true };
    default:
      return state;
  }
};
export default reducer;
