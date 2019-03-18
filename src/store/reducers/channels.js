import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelsObj: [],
  filteredChannelsObj: [],

  chObjMsgs: [],
  chInfo: {},

  msg: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CHANNELS:
      return {
        ...state,
        channelsObj: action.payload,
        filteredChannelsObj: action.payload
      };

    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channelsObj: [...state.channelsObj, action.payload]
      };

    case actionTypes.GET_CHANNEL_MSGS:
      return {
        ...state,
        chObjMsgs: action.payload
      };

    case actionTypes.POST_MSG:
      return {
        ...state,
        msg: action.payload
      };

    case actionTypes.GET_CHANNEL_INFO:
      let chInfo = state.channelsObj.find(ch => ch.id === +action.payload);
      console.log("actionTypes.GET_CHANNEL_INFO => chInfo: ", chInfo);
      return {
        ...state,
        chInfo: chInfo
      };

    case actionTypes.FILTER_CHANNELS:
      let filteredCh = state.channelsObj.filter(ch => {
        console.log("actionTypes.FILTER_CHANNELS => ch.name: ", ch);
        return `${ch.name}`.toLowerCase().includes(action.payload);
      });

      console.log("actionTypes.FILTER_CHANNELS => filteredCh: ", filteredCh);
      return {
        ...state,
        filteredChannelsObj: filteredCh
      };

    default:
      return state;
  }
};

export default reducer;
