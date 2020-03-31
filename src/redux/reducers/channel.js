import { SET_CHANNEL_DETAIL, SEND_MESSAGE } from "../actions/actionTypes";

const initialState = {
  channel: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL_DETAIL:
      return {
        ...state,
        channel: action.payload
      };

    case SEND_MESSAGE:
      const message = action.payload;
      return {
        ...state,
        channel: [...state.channel, message]
      };

    default:
      return state;
  }
};

export default reducer;
