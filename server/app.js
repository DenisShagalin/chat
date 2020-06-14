require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const io = require("socket.io")();
const Joi = require('joi');
const routes = require("./routes");
const config = require("./routes/config.json");
const schemas = require('./schemas');

const ChatMiddleware = require("./middleware/chat.middleware");
const MessagesMiddleware = require("./middleware/messages.middleware");
const sendMessages = require('./middleware/utils');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));

app.use("/", routes);

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, config.secret, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (client) => {
  client.on("entry_to_chat", async (options) => {
    const { error } = Joi.validate(options, schemas.optionsSchema);
    if (error) return;
    const res = await ChatMiddleware.checkIfUserExitInChat(options);
    if (!res) {
      await ChatMiddleware.setNewMemberToChat(options);
    }
    const members = await ChatMiddleware.getAllMembersByChat(options.chatId);
    io.emit(`chat_members/${options.chatId}`, members);

    await sendMessages(members, io, options.chatId);
  });

  client.on("send_message", async (data) => {
    const { error } = Joi.validate(data, schemas.postMessageSchema);
    if (error) return;
    await MessagesMiddleware.postNewMessage(data.msgOptions);
    const members = await ChatMiddleware.getAllMembersByChat(data.userOptions.chatId);

    await sendMessages(members, io, data.userOptions.chatId);
  });

  client.on("leave_chat", async (options) => {
    await ChatMiddleware.removeMemberFromChat(options);
    const members = await ChatMiddleware.getAllMembersByChat(options.chatId);
    io.emit(`chat_members/${options.chatId}`, members);
  });
});

io.listen(process.env.SOCKET_PORT || 8001);

module.exports = app;
