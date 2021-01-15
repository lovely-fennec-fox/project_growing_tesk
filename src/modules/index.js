import { combineReducers } from 'redux';
import spcdeInfo, { spcdeInfoSaga } from './spcdeInfo';
import post from './post';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ spcdeInfo, post });
export function* rootSaga() {
  yield all([spcdeInfoSaga()]);
}

export default rootReducer;
