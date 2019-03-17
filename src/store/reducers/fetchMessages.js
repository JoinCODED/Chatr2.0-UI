import * as actionTypes from "../actions/actionTypes";

const initialState = {
  masseges:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNELS:
      return {
        ...state,
        masseges: action.payload,
      };
      default:
      return state;
  }
};


export default reducer;