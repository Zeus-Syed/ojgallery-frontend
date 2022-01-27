import {  ADD_AUTH_TOKEN, REMOVE_AUTH_TOKEN } from '../actions';

const INITIAL_STATE = {
  authToken: "",
  user: {}
};

const authenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_AUTH_TOKEN:
        return {
          ...state,
          authToken: action.body.token,
          user: action.body.user 
        };
        case REMOVE_AUTH_TOKEN:
          return {
            ...state,
            authToken: "",
            user: {}
          };
      default:
        return state;
    }
  };
  
  export default authenticationReducer;
  