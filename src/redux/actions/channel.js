import { SET_CHANNEL_DETAIL, SEND_MESSAGE, SET_ERRORS } from "./actionTypes";

import instance from "./instance";
export const fetchChannelDetail = channelID => async dispatch => {
  try {
    const res = await instance.get(`channels/${channelID}/`);
    const channel = res.data;
    dispatch({
      type: SET_CHANNEL_DETAIL,
      payload: channel
    });
  } catch (err) {
    console.error(err);
  }
};

// export const sendMessage = (newbook) => async dispatch => {
//   try {
//     const res = await instance.post("/api/books/", newbook);
//     const book = res.data;
//     dispatch({
//       type: ADD_BOOK,
//       payload: book
//     });
//     closeModal();
//   } catch (err) {
//     dispatch({
//       type: SET_ERRORS,
//       payload: err.response.data
//     });
//   }
// };
