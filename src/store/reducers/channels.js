import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelsObj: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CHANNELS:
      return {
        ...state,
        channelsObj: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
