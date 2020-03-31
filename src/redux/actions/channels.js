import { SET_CHANNELS, CREATE_CHANNEL, SET_ERRORS } from "./actionTypes";
import { setErrors } from "./errors";
import instance from "./instance";

export const fetchChannels = () => async dispatch => {
  try {
    const res = await instance.get("channels/");
    const channels = res.data;
    // console.log(channels);
    dispatch({ type: SET_CHANNELS, payload: channels });
  } catch (err) {
    console.error(err);
  }
};

export const createChannel = newChannel => async dispatch => {
  try {
    //bad request
    console.log(newChannel);
    const res = await instance.post("channels/create/", newChannel);
    const channel = res.data;
    console.log(channel);
    dispatch(setErrors());
    dispatch({
      type: CREATE_CHANNEL,
      payload: channel
    });
    // closeModal();
  } catch (err) {
    // dispatch({
    //   type: SET_ERRORS,
    //   payload: err.response.data
    // });
    console.log(err);
  }
};
