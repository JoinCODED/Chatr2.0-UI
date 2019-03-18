import axios from "axios";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";


const instance = axios.create({
	baseURL: "https://api-chatr.herokuapp.com/"
});


export const getAllChannels = () => {
	return async dispatch => {
		try {
			let response = await instance.get("/channels/");
			let channels = response.data;

			console.log("zerodebug => channels action => getAllChannels => res.data: ". channels)
			dispatch({
				type: actionTypes.GET_ALL_CHANNELS,
				payload: channels,
			})

		} catch (error) {
			dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};


export const getChannelMsgs = (chID) => {
	console.log(chID)
	return async dispatch => {
		try {
			
			let response = await instance.get(`/channels/${chID}/`);
			let channel = response.data;

			dispatch({
				type: actionTypes.GET_CHANNEL_MSGS,
				payload: channel,
			})

		} catch (error) {
			dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};


export const getChannelInfo = (chID) => {
	return {
		type: actionTypes.GET_CHANNEL_INFO,
		payload: chID,
	}

};

export const postChannel = (newCh, history) => {
	return async dispatch => {
		try {
			console.log("New channel obj: ", newCh)
			let response = await instance.post("/channels/create/", newCh);
			
			let newChObj = response.data;

			console.log("zerodebug => channels action => postChannel => res.data: ", newChObj)
			dispatch({
				type: actionTypes.POST_CHANNEL,
				payload: newChObj,
			})

			let postedChID = newChObj.id
			history.push(`/channels/${postedChID}/`)

		} catch (error) {
			dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};


export const postMsg = (msg, chID) => {
	console.log(msg)
	return async dispatch => {
		try {
			console.log("New msg sent: ", msg)
			console.log("chID: ", chID)

			let response = await instance.post(`/channels/${chID}/send/`, msg);
			
			let newMsg = response.data;

			dispatch({
				type: actionTypes.POST_MSG,
				payload: newMsg,
			})

			dispatch(getChannelMsgs(chID))

		} catch (error) {
			dispatch(setErrors(error))
			console.error(error.response.data);
		}
	}
};