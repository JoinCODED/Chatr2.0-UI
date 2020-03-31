import { GET_CHANNELS } from "../actions/actionTypes";

const initialState = { channels: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      const channels = action.payload;
      return { ...state, channels: channels };
    default:
      return state;
  }
};

export default reducer;
