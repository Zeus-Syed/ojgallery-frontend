import { ADD_AUTH_TOKEN } from '../actions';
import { takeLatest, put, fork, all } from 'redux-saga/effects';

function* updateAuthToken(action){
    try{
    //   yield put({
    //       type: ADD_AUTH_TOKEN,
    //       payload: action.payload
    //   })
    }
    catch(err){
        console.log("err", err);
    }
}

function* authWatcherSaga() {
   yield takeLatest(ADD_AUTH_TOKEN, updateAuthToken)
}

export default function* authSaga() {
    yield all([fork(authWatcherSaga)]);
}