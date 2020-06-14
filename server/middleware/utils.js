const MessagesMiddleware = require("./messages.middleware");

const sendMessages = async (members, io, chatId) => {
  !!members.length && members.forEach(async(item) => {
    const messages = await MessagesMiddleware.getAllMessagesByChat({
      chatId,
      userId: item.user.id,
    });
    io.emit(`messages/${chatId}/${item.user.id}`, messages);
  });
  return true;
};

module.exports = sendMessages;