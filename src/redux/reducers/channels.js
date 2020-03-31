import { CHANNELS } from "../actions/actionTypes";

const initialState = { channels: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNELS:
      const channels = action.payload;
      return { ...state, channels: channels };
    default:
      return state;
  }
};

export default reducer;
