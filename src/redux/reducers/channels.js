import { GET_CHANNELS, ADD_CHANNEL } from "../actions/actionTypes";

const initialState = { channels: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      const channels = action.payload;
      return { ...state, channels: channels };
    case ADD_CHANNEL:
      return {
        ...state,
        channels: [action.payload, ...state.channels]
      };
    default:
      return state;
  }
};

export default reducer;
