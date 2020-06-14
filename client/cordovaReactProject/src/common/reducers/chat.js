import { SET_ALL_CHATS } from '../actions/chat';

const initialState = {
  chats: [],
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
}
