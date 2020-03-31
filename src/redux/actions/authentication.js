import jwt_decode from "jwt-decode";

import instance from "./instance";

import { SET_CURRENT_USER, SET_ERRORS } from "./actionTypes";
import { getChannels } from "./channels";

export const checkForExpiredToken = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      console.log((user.exp - currentTime) / 60);
      if (user.exp >= currentTime) {
        setAuthHeader(token);
        dispatch(setCurrentUser(user));
        dispatch(getChannels());
      } else {
        dispatch(logout());
      }
    }
  };
};

export const setAuthHeader = token => {
  instance.defaults.headers.Authorization = `jwt ${token}`;
};

export const login = userData => async dispatch => {
  try {
    const response = await instance.post("login/", userData);
    const { token } = response.data;
    const user = jwt_decode(token);
    setAuthHeader(token);
    dispatch(getChannels());
    dispatch(setCurrentUser(user));
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const signup = userData => async dispatch => {
  try {
    const response = await instance.post("signup/", userData);
    const { token } = response.data;
    const user = jwt_decode(token);
    setAuthHeader(token);
    dispatch(setCurrentUser(user));
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => ({
  type: SET_CURRENT_USER,
  payload: null
});

const setCurrentUser = token => ({
  type: SET_CURRENT_USER,
  payload: token
});
