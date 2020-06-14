import { all } from 'redux-saga/effects';
import authSaga from './auth';
import chatSaga from './chat';

const sagas = function* rootSaga() {
  yield all([
    authSaga(),
    chatSaga(),
  ]);
};

export default sagas;
