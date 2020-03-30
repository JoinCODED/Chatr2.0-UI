import { ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
<<<<<<< HEAD
  listChannel: [
    { title: "all", messages: ["message1", "msg2", "msg3"] },
    { title: "CODED", messages: ["message1", "msg2", "msg3"] }
  ]
=======
  /*
   *
   * I'd rename this property to channels.
   *
   */
  listChannel: [{ title: "all" }, { title: "CODED" }]
>>>>>>> 6b0aa0eac71c8dbbbb02480b11c85870d21dfdd7
};

/*
 *
 * You have to receives the list of channels from the backend API.
 * So the two cards you have for channels that are in the Done list
 * should be moved back to Doing or Backlog.
 * Look at the Project Description on Warehouse for details on this.
 *
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      const newChannel = {
        title: action.payload
      };
      /*
       * Remove unnecessary commented code before merging to master.
       */
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
