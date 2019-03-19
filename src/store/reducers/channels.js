import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelsObj: [],
  filteredChannelsObj: [],
  query: "",

  chObjMsgs: [],
  filterChObjMsgs: [],
  chInfo: {},

  msgLoading: true,
  chLoading: true,

  msg: "" // Why do we save the msg rether than get it from the senteral store
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CHANNELS:
      return {
        ...state,
        channelsObj: action.payload,
        filteredChannelsObj: action.payload,
        chLoading: false
      };

    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channelsObj: [...state.channelsObj, action.payload]
      };

    case actionTypes.GET_CHANNEL_MSGS:
      return {
        ...state,
        chObjMsgs: action.payload,
        filterChObjMsgs: action.payload.filter(msg => {
          // Why do we need to feed this here
          return `${msg.message}`.toLowerCase().includes(state.query);
        }),
        msgLoading: false
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

    case actionTypes.FILTER_MSGS:
      let filterChObjs = state.chObjMsgs.filter(msg => {
        return `${msg.message}`.toLowerCase().includes(action.payload);
      });

      return {
        ...state,
        query: action.payload,
        filterChObjMsgs: filterChObjs
      };

    case actionTypes.REST_QUERY:
      return {
        ...state,
        query: ""
      };

    case actionTypes.SET_MSG_LOADING:
      return {
        ...state,
        msgLoading: true
      };

    case actionTypes.SET_MSG_LOADING:
      return {
        ...state,
        chLoading: true
      };

    default:
      return state;
  }
};

export default reducer;
