import { SET_CHANNEL_DETAIL } from "../actions/actionTypes";

const initialState = {
  messages: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL_DETAIL:
      return {
        ...state,
        messages: action.payload
      };

    // case ADD_BOOK:
    //   const book = action.payload;
    //   return {
    //     ...state,
    //     author: {
    //       ...state.author,
    //       books: [...state.author.books, book]
    //     }
    //   };
    default:
      return state;
  }
};

export default reducer;
