import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelsObj: [],
  chObj: [],
  msg: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CHANNELS:
      return {
        ...state,
        channelsObj: action.payload
      };
    
    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channelsObj: [...state.channelsObj, action.payload]
      }

    case actionTypes.GET_CHANNEL:
      return {
        ...state,
        chObj: action.payload
      }

    case actionTypes.POST_MSG:
      return {
        ...state,
        msg: action.payload
      }

    default:
      return state;
  }
};

export default reducer;
