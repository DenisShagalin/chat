const db = require("../db/models");

db.messages.belongsTo(db.users, { as: "user", foreignKey: "userId" });

class MessagesMiddleware {
  async getAllMessagesByChat(chatId) {
    return db.messages.findAll({
      attributes: ["message", "createdAt", "id"],
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["nick"],
        },
      ],
      where: {
        chatId: chatId
      },
    });
  }

  async postNewMessage(options) {
    return db.messages.create({
      message: options.message,
      chatId: options.chatId,
      userId: options.userId,
      createdAt: new Date(),
    });
  }
}

module.exports = new MessagesMiddleware();
