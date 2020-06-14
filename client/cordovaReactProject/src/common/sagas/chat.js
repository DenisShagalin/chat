import http from "../../services/http";
import { put, takeEvery, call } from "redux-saga/effects";

import {
  LOAD_ALL_CHATS,
  setAllChats,
  CREATE_CHAT,
} from "../actions/chat";

function* loadChats(action) {
  try {
    const chatList = yield call(http, {
      url: `/chats?search=${action.payload}`,
      method: "GET",
    });
    yield put(setAllChats(chatList.data));
  } catch (error) {
    console.log(error);
  }
}

function* createChat(action) {
  try {
    yield call(http, {
      url: "/chats",
      method: "POST",
      data: {
        name: action.payload.name,
        creator: action.payload.creator,
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* chatSaga() {
  yield takeEvery(LOAD_ALL_CHATS, loadChats);
  yield takeEvery(CREATE_CHAT, createChat);
};
