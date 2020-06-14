export const LOAD_ALL_CHATS = '@chat/GET_ALL_CHATS';
export const SET_ALL_CHATS = '@chat/SET_ALL_CHATS';
export const CREATE_CHAT = '@chat/CREATE_CHAT';

export const loadAllChats = (search) => ({
  type: LOAD_ALL_CHATS,
  payload: search,
});

export const setAllChats = (list) => ({
  type: SET_ALL_CHATS,
  payload: list,
});

export const createChat = (name, creator) => ({
  type: CREATE_CHAT,
  payload: {
    name,
    creator,
  },
});
