import { SET_CHANNEL, ADD_CHANNEL } from "./actionTypes";
import instance from "./instance";
import user from "../reducers/user";

export const fetchChannels = () => async dispatch => {
  console.log(user);

  try {
    const res = await instance.get("/channels/");
    const channels = res.data;
    dispatch({
      type: SET_CHANNEL,
      payload: channels
    });
  } catch (error) {
    console.error(error);
  }
};

export const postChannel = channel => async dispatch => {
  try {
    const res = await instance.post("/channels/create/", channel);
    const newChannel = res.data;

    dispatch({
      type: ADD_CHANNEL,
      payload: newChannel
    });
  } catch {
    console.log("error at post channel");
  }
};
