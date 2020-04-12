import { SET_MESSAGE, CLEAR_MESSAGES } from "../actions/actionTypes";

const initialState = {
  setMessages: [],
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        setMessages: state.setMessages.concat(action.payload),
      };
    case CLEAR_MESSAGES:
      return { setMessages: [] };

    default:
      return state;
  }
};
export default channelReducer;
