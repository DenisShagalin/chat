import http from '../../services/http';
import { put, takeEvery, call } from 'redux-saga/effects';

import {
  setAuthData,
  SIGN_IN,
  SIGN_UP,
  LOAD_USERS,
  setUsers,
} from '../actions/auth';

function* signIn(action) {
  try {
    localStorage.removeItem('auth');
    const user = yield call(http, {
      url: '/signin',
      method: 'POST',
      data: action.payload,
    });
    localStorage.setItem('auth', user.data.token);
    yield put(setAuthData({
      token: user.data.token,
      user: user.data.user,
    }));
  } catch (error) {
    console.log(error);
  }
}

function* signUp(action) {
  try {
    const user = yield call(http, {
      url: '/signup',
      method: 'POST',
      data: action.payload,
    });
    localStorage.setItem('auth', user.data.token);

    yield put(setAuthData({
      token: user.data.token,
      user: user.data.user,
    }));
  } catch (error) {
    console.log(error);
  }
}

function* loadUsers(action) {
  try {
    const users = yield call(http, {
      url: `/users/${action.payload}`,
      method: 'GET',
    });

    yield put(setUsers(users.data));

  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeEvery(SIGN_IN, signIn);
  yield takeEvery(SIGN_UP, signUp);
  yield takeEvery(LOAD_USERS, loadUsers);
};
