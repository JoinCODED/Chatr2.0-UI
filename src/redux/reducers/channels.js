import { ADD_CHANNEL, FETCH_CHANNELS } from "../actions/actionTypes";

const initialState = {
  channels: [],
  messages: []
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS:
      const channels = action.payload;
      return {
        ...state,
        channels: channels
      };

    case ADD_CHANNEL:
      const addedChannels = [action.payload].concat(state.channels);
      return {
        ...state,
        channels: addedChannels
      };

    default:
      return state;
  }
};
export default channelsReducer;
