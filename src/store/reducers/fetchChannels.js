import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };
      default:
      return state;
  }
};


export default reducer;