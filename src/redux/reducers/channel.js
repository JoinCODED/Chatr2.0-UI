import { ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
  listChannel: [
    { title: "all", messages: ["message1", "msg2", "msg3"] },
    { title: "CODED", messages: ["message1", "msg2", "msg3"] }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      const newChannel = {
        title: action.payload
      };
      //   console.log(this.state.listChannel);
      return {
        ...state,
        listChannel: [newChannel].concat(state.listChannel)
      };

    default:
      return state;
  }
};

export default reducer;
