const db = require("../db/models");

db.chatsToUsers.belongsTo(db.users, { foreignKey: "userId" });
db.chatsToUsers.belongsTo(db.chats, { foreignKey: "chatId" });
db.chats.hasMany(db.chatsToUsers)

class ChatMiddleware {
  async setNewMemberToChat({ userId, chatId }) {
    return db.chatsToUsers.create({
      chatId,
      userId,
    });
  }

  async checkIfUserExitInChat({ userId, chatId }) {
    return db.chatsToUsers.findOne({
      where: {
        chatId: chatId,
        userId: userId,
      },
    });
  }

  async removeMemberFromChat({ userId, chatId }) {
    return db.chatsToUsers.destroy({
      where: {
        chatId: chatId,
        userId: userId,
      },
    });
  }

  async getAllMembersByChat(chatId) {
    return db.chatsToUsers.findAll({
      attributes: [],
      include: [
        {
          model: db.users,
          attributes: ["nick", "id"],
        },
      ],
      where: {
        chatId: chatId,
      },
    });
  }

  async getAllChats(options) {
    return db.chats.findAll({
      where: {
        name: {
          [db.Op.iLike]: `%${options.search || ""}%`,
        },
      },
      attributes: ["name", "id"],
      include: [
        {
          model: db.chatsToUsers,
          attributes: [],
          where: { userId: options.userId },
        },
      ],
    });
  }

  async getChatByName(name) {
    return db.chats.findOne({
      where: {
        name: name,
      },
    });
  }

  async getChatById(id) {
    return db.chats.findOne({
      where: {
        id: id,
      },
      attributes: ["name"],
    });
  }

  async postNewChat(options) {
    await db.chats.create({
      name: options.name,
      creatorId: options.creator,
      type: options.type,
    });

    return db.chats.findOne({
      where: {
        name: options.name,
      },
    });
  }
}

module.exports = new ChatMiddleware();
