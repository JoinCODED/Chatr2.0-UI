import { VIEW_CHANNEL, ADD_MESSAGE } from "../actions/actionTypes";

const initialState = {
  currentChannel: null,
  messages: []
};

const channelViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CHANNEL:
      let channel = action.payload;
      return {
        ...state,
        currentChannel: channel
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    default:
      return state;
  }
};

export default channelViewReducer;
