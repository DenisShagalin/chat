import { SET_AUTH_DATA } from '../actions/auth';

const initialState = {
  user: {},
  token: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
