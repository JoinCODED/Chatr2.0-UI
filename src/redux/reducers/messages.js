import { SET_MESSAGES, ADD_MESSAGE } from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      const messages = action.payload;
      return messages;
    case ADD_MESSAGE:
      const newMessage = action.payload;
      return [newMessage, ...state];
    default:
      return state;
  }
};

export default reducer;
