import { FETCH_CHANNELS } from "../actions/actionTypes";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  filteredChannels: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS:
      return {
        ...state,
        channels: state.channels.concat(action.payload),
        filteredChannels: state.filteredChannels.concat(action.payload),
        loading: false
      };
    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channels: [action.payload].concat(state.channels)
      };
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`.toLowerCase().includes(action.payload);
        })
      };
    default:
      return state;
  }
};

export default reducer;
