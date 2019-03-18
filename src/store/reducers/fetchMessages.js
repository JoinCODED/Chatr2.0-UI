import * as actionTypes from "../actions/actionTypes";

const initialState = {
  masseges:[],
  loading:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        masseges: action.payload,
        loading:true,
      };
      case actionTypes.SET_MESSAGES_TIME_STAMP:
      return {
        ...state,
        masseges: state.masseges.concat(action.payload),
        loading:true,
      };
      default:
      return state;
  }
};


export default reducer;