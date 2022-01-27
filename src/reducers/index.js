import {combineReducers} from 'redux';
import authenticationReducer from './authenticationReducer';

const reducers = combineReducers({
    authenticationReducer
})

const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGOUT'){
        state = undefined;
    }
    return reducers(state, action)
}

export default rootReducer;