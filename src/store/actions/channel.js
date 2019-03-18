import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchAllMessages = channelID => {
    return async dispatch => {
        try {
            const res = await instance.get(`/channels/${channelID}`);
            const channel = res.data;
            dispatch({
                type: actionTypes.FETCH_ALL_MESSAGES,
                payload: channel
            })
        } catch (err) {
            // dispatch({
            //     type: actionTypes.SET_ERRORS,
            //     payload: err.response.data
            // });
        }
    };

}
export const PostMessage = (message, channelID) => {
    return async dispatch => {
        try {

            const res = await instance.post(`/channels/${channelID}/send/`, message);
            let newmessage = res.data;
            console.log(res)
            // dispatch(setErrors());
            dispatch({
                type: actionTypes.POST_MESSAGE,
                payload: newmessage
            });
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: actionTypes.SET_ERRORS,
            //     payload: err.response.data
            // });
        }
    };
};

