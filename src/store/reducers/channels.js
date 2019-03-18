import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelsObj: [],
  chObjMsgs: [],
  chInfo: {},
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

    case actionTypes.GET_CHANNEL_MSGS:
      return {
        ...state,
        chObjMsgs: action.payload
      }

    case actionTypes.POST_MSG:
      return {
        ...state,
        msg: action.payload
      }

    case actionTypes.GET_CHANNEL_INFO:
      let chInfo = state.channelsObj.find(ch => ch.id === +action.payload)
      console.log("actionTypes.GET_CHANNEL_INFO => chInfo: ", chInfo)
      return {
        ...state,
        chInfo: chInfo,
      }

    default:
      return state;
  }
};

export default reducer;
