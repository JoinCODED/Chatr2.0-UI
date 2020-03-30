import { ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
  listChannel: [{ title: "all" }, { title: "CODED" }]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      const newChannel = {
        title: action.payload
      };
      return {
        ...state,
        list: [newChannel].concat(state.listChannel)
      };

    default:
      return state;
  }
};

export default reducer;
