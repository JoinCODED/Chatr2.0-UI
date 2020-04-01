import { VIEW_CHANNEL } from "../actions/actionTypes";

const initialState = {
  currentChannel: null
};

const channelViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CHANNEL:
      let channel = action.payload;
      return {
        ...state,
        currentChannel: channel
      };
    default:
      return state;
  }
};

export default channelViewReducer;
