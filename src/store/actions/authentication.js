import axios from "axios";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setAuthToken = token => {
  return dispatch => {
    if (token) {
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      localStorage.setItem("myToken", token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("myToken");
      dispatch(setCurrentUser());
    }
  };
};
// const setAuthToken = token => {
//   return dispatch => {
//     axios.defaults.headers.common.Authorization = `JWT ${token}`;
//     const decodedUser = jwt_decode(token);
//     dispatch(setCurrentUser(decodedUser));
//   };
// };

export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
      } else {
        dispatch(logout());
      }
    }
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "https://api-chatr.herokuapp.com/login/",
        userData
      );
      let user = await response.data;

      setAuthToken(user.token);
      const decodedUser = jwt_decode(user.token);
      dispatch(setCurrentUser(decodedUser));
      history.push("/private");
    } catch (err) {
      console.log("An error occurred.", err);
    }
  };
};

// export const signup = userData => {
//   let user;
//   return async dispatch => {
//     try {
//       let res = await axios.post(
//         "https://precious-things.herokuapp.com/signup/",
//         userData
//       );
//       user = await res.data;
//     } catch (error) {
//       console.error(error.response.data);
//     }
//     dispatch(setAuthToken(user.token));
//   };
// };

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "https://api-chatr.herokuapp.com/signup/",
        userData
      );
      let user = await response.data;

      setAuthToken(user.token);
      const decodedUser = jwt_decode(user.token);
      dispatch(setCurrentUser(decodedUser));
      history.push("/welcome");
    } catch (error) {
      console.error(error.response.data);
    }
  };
};

export const logout = () => {
  setAuthToken();
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
