import { SET_ERRORS } from "./actionTypes";

export const setErrors = errors => ({ type: SET_ERRORS, payload: errors });
export const resetErrors = () => ({ type: SET_ERRORS, payload: [] });
