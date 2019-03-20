import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await instance.get("/channels/");
      const channels = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: channels
      });
    } catch (err) {}
  };
};

// export const filterChannels = query => {
//     return {

//         type: actionTypes.FETCH_CHANNELS,
//         payload: query

//     }
// };

export const postChannel = (newChannel, closeModal) => {
  return async dispatch => {
    try {
      const res = await instance.post("/channels/create/", newChannel);
      const channel = res.data;
      // dispatch(resetErrors());
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: channel
      });
      // dispatch(filterChannel(""));
      closeModal();
    } catch (err) {}
  };
};
