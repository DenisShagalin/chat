const express = require("express");
const router = express.Router();
const Joi = require("joi");

const schemas = require("../schemas");
const ChatMiddleware = require("../middleware/chat.middleware");
const MessagesMiddleware = require("../middleware/messages.middleware");

module.exports = function (io) {
  io.on("connection", (client) => {
    client.on("chats", async (options) => {
      try {
        const { error } = Joi.validate(options, schemas.searchChatSchema);
        if (error) return;
        const res = await ChatMiddleware.getAllChats(options);
        io.emit(`chats/${options.userId}`, res);
      } catch (e) {
        console.log(e);
      }
    });

    client.on("create_chat", async (options) => {
      try {
        const { error } = Joi.validate(options, schemas.createNewChatSchema);
        if (error) return;

        const existChat = await ChatMiddleware.getChatByName(options.name);
        if (!!existChat) return;

        const chat = await ChatMiddleware.postNewChat(options);
        await options.users.forEach(async (user) => {
          const res = await ChatMiddleware.checkIfUserExitInChat({
            userId: user,
            chatId: chat.id,
          });
          if (!res) {
            await ChatMiddleware.setNewMemberToChat({
              userId: user,
              chatId: chat.id,
            });
          }
        });

        options.users(async (user) => {
          const res = await ChatMiddleware.getAllChats({
            search: "",
            userId: user,
          });
          io.emit(`chats/${user}`, res);
        });
      } catch (e) {
        console.log(e);
      }
    });

    client.on("entry_to_chat", async (options) => {
      try {
        const { error } = Joi.validate(options, schemas.optionsSchema);
        if (error) return;

        const members = await ChatMiddleware.getAllMembersByChat(
          options.chatId
        );
        io.emit(`chat_members/${options.chatId}`, members);

        const messages = await MessagesMiddleware.getAllMessagesByChat(
          options.chatId
        );
        io.emit(`messages/${options.chatId}`, messages);
      } catch (e) {
        console.log(e);
      }
    });

    client.on("add_new_members_to_chat", async (options) => {
      try {
        const { error } = Joi.validate(options, schemas.addMembersSchema);
        if (error) return;
        options.users.forEach(async (user) => {
          await ChatMiddleware.setNewMemberToChat({
            userId: user,
            chatId: options.chatId,
          });
          const members = await ChatMiddleware.getAllMembersByChat(
            options.chatId
          );
          io.emit(`chat_members/${options.chatId}`, members);

          const res = await ChatMiddleware.getAllChats({ search: '', userId: user});
          io.emit(`chats/${user}`, res);

        });
      } catch (e) {
        console.log(e);
      }
    });

    client.on("send_message", async (options) => {
      try {
        const { error } = Joi.validate(options, schemas.postMessageSchema);
        if (error) return;
        await MessagesMiddleware.postNewMessage(options.msgOptions);
        const messages = await MessagesMiddleware.getAllMessagesByChat(
          options.userOptions.chatId,
        );
        io.emit(`messages/${options.userOptions.chatId}`, messages);

        const { message, chatId } = options.msgOptions;
        const chat = await ChatMiddleware.getChatById(chatId);

        io.emit(`notifications/${chatId}`, { message, chat });
      } catch (e) {
        console.log(e);
      }
    });

    client.on("leave_chat", async (options) => {
      const { error } = Joi.validate(options, schemas.optionsSchema);
      if (error) return;
      await ChatMiddleware.removeMemberFromChat(options);
      const members = await ChatMiddleware.getAllMembersByChat(options.chatId);
      io.emit(`chat_members/${options.chatId}`, members);
    });
  });
  return router;
};
