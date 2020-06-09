export const SET_AUTH_DATA = '@auth/SET_AUTH_DATA';
export const SIGN_IN = '@auth/SIGN_IN';
export const SIGN_UP = '@auth/SIGN_UP';

export const setAuthData = ({ user, token }) => ({
  type: SET_AUTH_DATA,
  payload: {
    user,
    token
  }
});

export const signIn = (data) => ({
  type: SIGN_IN,
  payload: data
});

export const signUp = (data) => ({
  type: SIGN_UP,
  payload: data,
});
