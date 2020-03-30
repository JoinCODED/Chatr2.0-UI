import decode from "jwt-decode";

import instance from "./instance";

import { SET_CURRENT_USER } from "./actionTypes";

import { setErrors } from "./errors";

export const checkForExpiredToken = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    const currentTime = Date.now() / 1000;
    //decode token and get user information
    const user = decode(token);
    //chek token expiration
    if (user.exp >= currentTime) {
      //setAuthHeader
      setAuthHeader(token);
      //set the user
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
    } else {
      dispatch(logout());
    }
  }
};

const setLocalToken = token => {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
};

const setAuthHeader = token => {
  if ({ token }) instance.defaults.headers.Authorization = `jwt ${token}`;
  else delete instance.defaults.headers.Authorization;
};

export const login = userData => async dispatch => {
  try {
    const response = await instance.post("login/", userData);
    const { token } = response.data;
    setAuthHeader(token);
    setLocalToken(token);
    const user = decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (error) {
    console.error(error);
  }
};

export const signup = userData => async dispatch => {
  try {
    const response = await instance.post("signup/", userData);
    const { token } = response.data;
    setAuthHeader(token);
    setLocalToken(token);
    const user = decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  setAuthHeader(null);
  setLocalToken(null);
  return {
    type: SET_CURRENT_USER,
    payload: null
  };
};

const setCurrentUser = token => {};
