import { all } from 'redux-saga/effects';
import authSaga from './auth';

const sagas = function* rootSaga() {
  yield all([
    authSaga(),
  ]);
};

export default sagas;
