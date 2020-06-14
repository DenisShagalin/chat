const db = require("../db/models");

db.messages.belongsTo(db.users, { as: "user", foreignKey: "userId" });
db.messages.belongsTo(db.users, { as: "recipient", foreignKey: "recipientId" });

class MessagesMiddleware {
  async getAllMessagesByChat({ chatId, userId }) {
    return db.messages.findAll({
      attributes: ["message", "createdAt", "id"],
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["nick"],
        },
        {
          model: db.users,
          as: "recipient",
          attributes: ["nick"],
        },
      ],
      where: {
        chatId: {
          [db.Op.eq]: chatId,
        },
          [db.Op.or]: [
            {
              type: "public",
            },
            {
              type: "private",
              recipientId: {
                [db.Op.eq]: userId,
              }
            },
            {
              type: "private",
              userId: {
                [db.Op.eq]: userId,
              }
            },
          ],
      },
    });
  }

  async postNewMessage(options) {
    return db.messages.create({
      type: options.type,
      message: options.message,
      chatId: options.chatId,
      userId: options.userId,
      recipientId: options.recipientId,
      createdAt: new Date(),
    });
  }
}

module.exports = new MessagesMiddleware();
