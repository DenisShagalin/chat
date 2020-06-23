import { SET_AUTH_DATA, SET_USERS } from '../actions/auth';

const initialState = {
  user: {},
  token: null,
  users: [],
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state;
  }
}
