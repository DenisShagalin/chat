const express = require("express");
const router = express.Router();
const Joi = require("joi");

const schemas = require("../schemas");
const ChatMiddleware = require("../middleware/chat.middleware");
const MessagesMiddleware = require("../middleware/messages.middleware");
const sendMessages = require('../middleware/utils');

module.exports = function (io) {
  io.on("connection", (client) => {

    client.on('chats', async (options) => {
      const { error } = Joi.validate(options, schemas.searchChatSchema);
      if (error) return;
      const res = await ChatMiddleware.getAllChats(options.search);
      io.emit('chats', res);
    });

    client.on('create_chat', async (options) => {
      const { error } = Joi.validate(options, schemas.createNewChatSchema);
      if (error) return;
      const existChat = await ChatMiddleware.getChatByName(options.name);
      if (!!existChat) return;
      const res = await ChatMiddleware.postNewChat(options);
      io.emit('chats', res);
    });

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
      const members = await ChatMiddleware.getAllMembersByChat(
        data.userOptions.chatId
      );

      await sendMessages(members, io, data.userOptions.chatId);
    });

    client.on("leave_chat", async (options) => {
      await ChatMiddleware.removeMemberFromChat(options);
      const members = await ChatMiddleware.getAllMembersByChat(options.chatId);
      io.emit(`chat_members/${options.chatId}`, members);
    });
  });
  return router;
};
