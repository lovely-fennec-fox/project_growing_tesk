import { getData } from '../lib/api';
import {
  reducerUtils,
  handleAsyncActions,
  createPromiseSaga,
} from '../lib/asyncUtils';
import { takeEvery } from 'redux-saga/effects';

const GET_DATA = 'GET_DATA';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_ERROR = 'GET_DATA_ERROR';

export const getSpcdeInfo = (date) => ({
  type: GET_DATA,
  payload: date,
});

const getSpcdeInfoSaga = createPromiseSaga(GET_DATA, getData);

export function* spcdeInfoSaga() {
  yield takeEvery(GET_DATA, getSpcdeInfoSaga);
}

const initialState = {
  info: reducerUtils.initial(),
};

export default function spcdeInfo(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
    case GET_DATA_SUCCESS:
    case GET_DATA_ERROR:
      return handleAsyncActions(GET_DATA, 'info', true)(state, action);
    default:
      return state;
  }
}
