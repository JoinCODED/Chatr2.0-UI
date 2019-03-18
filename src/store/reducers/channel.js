import * as actionTypes from "../actions/actionTypes";


const initialState = {
    messages: [],
    // loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_MESSAGES:
            return {
                ...state,
                messages: action.payload,
                // loading: false,
            };
        case actionTypes.POST_MESSAGE:
            //UPDATE THE STATE ACCORDINGLY
            console.log(state.messages)
            console.log(action.payload)
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        // case actionTypes.SET_CHANNEL_LOADING:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        default:
            return state;
    }
}
export default reducer;