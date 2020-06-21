import socketIOClient from "socket.io-client";

const socketApi = process.env.REACT_APP_API;

const socket = (token) => (
  socketIOClient(socketApi, {
    query: {
      token: token,
    },
  })
);

export default socket;
